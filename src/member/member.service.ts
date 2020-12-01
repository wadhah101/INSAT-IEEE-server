import {
  RawCardInfo,
  nameTransformer,
} from './../utils/raw/raw-card-info/entities/raw-card-info.entity';
import { Injectable } from '@nestjs/common';
import { Member } from '@prisma/client';
import { env } from 'process';
import { PrismaService } from 'src/prisma/prisma.service';
import { toFile as QrFile } from 'qrcode';
import { join as fsJoin, join } from 'path';
import { GoogleDriveService } from 'src/utils/google-drive/google-drive.service';
import * as fs from 'fs';
import { RawCardInfoService } from 'src/utils/raw/raw-card-info/raw-card-info.service';
import { RawInscriptionInfo } from 'src/utils/raw/raw-card-info/entities/raw-inscription-info.entity';
import * as fileType from 'file-type';
import * as papa from 'papaparse';
import { ieeeAccountFactory } from './dto/create-member.dto';

@Injectable()
export class MemberService {
  constructor(
    private prisma: PrismaService,
    private readonly googleDriveService: GoogleDriveService,
    private readonly rawCardInfoService: RawCardInfoService,
  ) {}

  async findAll(): Promise<Member[]> {
    return this.prisma.member.findMany({ include: { ieeeAccount: true } });
  }

  async genqQrs(): Promise<string[]> {
    const c = await this.prisma.member.findMany({
      select: { id: true },
      where: { imageFile: { not: null } },
    });
    const files = c.map((e) => ({
      path: fsJoin(env.OUTPUT_QR, `${e.id}.png`),
      data: e.id,
    }));

    const codes = files.map((e) =>
      QrFile(e.path, e.data, {
        margin: 1,
        scale: 20,
      }),
    );
    await Promise.all(codes);
    return files.map((e) => e.path);
  }

  // takes data from inscription form csv and inserts it into database
  async seedFromInscription() {
    const temp = await this.rawCardInfoService.inscriptionData;

    // only leave unique inputs
    const raw = temp
      .map((e) => RawInscriptionInfo.toMember(e))
      .filter(
        (e, ind, arr) =>
          ind ===
          arr.findIndex(
            (e2) =>
              (e.fbLink &&
                e2.fbLink &&
                e.fbLink.toUpperCase() === e2.fbLink.toUpperCase()) ||
              e2.phone == e.phone ||
              e2.email.toUpperCase() === e.email.toUpperCase(),
          ),
      );

    // const repreatedFb = raw.filter(
    //   (e, ind, arr) => ind !== arr.findIndex((e2) => e2.phone === e.phone),
    // );

    const req = raw.map((e) => this.prisma.member.create({ data: e }));
    return this.prisma.$transaction(req);
  }

  // takes data from cardForm csv and either links it with old member or creates new member
  async seedFromCardForm() {
    const pattern = /id=(.*)/;
    const raw = await this.rawCardInfoService.cardData;

    const res = await this.prisma.member.findMany();

    // classify members into two group ,  based on inscription form user record existance
    const [inprev, nonInPrev] = raw.reduce<
      [{ inscription: Member; card: RawCardInfo }[], RawCardInfo[]]
    >(
      (acc, cur) => {
        const isInPrev = res.find(
          (e2) =>
            cur.personalMail.toUpperCase() == e2.email.toUpperCase() ||
            Number(cur.phone) === Number(e2.phone),
        );
        if (isInPrev) acc[0].push({ inscription: isInPrev, card: cur });
        else acc[1].push(cur);
        return acc;
      },
      [[], []],
    );

    const inPrevWork = inprev.map((e) =>
      this.prisma.member.update({
        where: { id: e.inscription.id },
        data: {
          imageDriveId: e.card.picture.match(pattern)[1],
          ieeeAccount: {
            create: ieeeAccountFactory(e.card),
          },
        },
      }),
    );
    await this.prisma.$transaction(inPrevWork);

    const nonInPrevWork = nonInPrev.map((e) =>
      this.prisma.member.create({
        data: {
          fullName: nameTransformer(e.fullName),
          email: e.personalMail,
          phone: Number(e.phone),
          imageDriveId: e.picture.match(pattern)[1],
          ieeeAccount: {
            create: ieeeAccountFactory(e),
          },
        },
      }),
    );
    return this.prisma.$transaction(nonInPrevWork);
  }

  async downloadImage() {
    const all = await this.prisma.member.findMany({
      select: { imageDriveId: true },
      where: { imageDriveId: { not: null }, imageFile: { equals: null } },
    });

    // get non downloaded ids
    const ids = all.map((e) => e.imageDriveId);
    if (!ids.length) return [];

    await this.googleDriveService.downloadFilesFromIds(ids);
    return this.linkImages();
  }

  async linkImages() {
    const data = await this.prisma.member.findMany({
      where: { imageDriveId: { not: null }, imageFile: { equals: null } },
    });

    const withImagesReq = data.map(async (e) => {
      const oldPath = join(env.PICTURE_STORAGE_LOCATION_RAW, e.imageDriveId);
      const c = await fileType.fromFile(oldPath);

      const newName = `${e.fullName} ${e.id}.${c.ext}`;
      const newPath = join(env.PICTURE_STORAGE_LOCATION, newName);

      await fs.promises.copyFile(oldPath, newPath);

      return { ...e, imageFile: newName };
    });

    const withImages = await Promise.all(withImagesReq);

    const updates = withImages.map((e) =>
      this.prisma.member.update({ where: { id: e.id }, data: e }),
    );

    return this.prisma.$transaction(updates);
  }

  async exportToAnisCsv() {
    const raw = await this.prisma.member.findMany({
      select: { id: true, fullName: true, imageFile: true },
      where: { imageFile: { not: null } },
    });

    const data = raw.map((e) => ({
      fullName: e.fullName,
      imageFile: e.imageFile,
      qrCode: `${e.id}.png`,
    }));

    const result = papa.unparse(data, { quotes: true });

    const path = join('/tmp', 'anis.csv');

    await fs.promises.writeFile(path, result);

    return fs.createReadStream(path);
  }
}
