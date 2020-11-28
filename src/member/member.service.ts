import { RawCardInfo } from './../utils/raw/raw-card-info/entities/raw-card-info.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Member } from '@prisma/client';
import { env } from 'process';
import { PrismaService } from 'src/prisma/prisma.service';
import { toFile as QrFile } from 'qrcode';
import { join as fsJoin } from 'path';
import { GoogleDriveService } from 'src/utils/google-drive/google-drive.service';
import * as fs from 'fs';
import { RawCardInfoService } from 'src/utils/raw/raw-card-info/raw-card-info.service';
import { RawInscriptionInfo } from 'src/utils/raw/raw-card-info/entities/raw-card-info.entity';

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
    const c = await this.findAll();
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

  async seedFromInscription() {
    // only leave unique inputs
    const raw = this.rawCardInfoService.inscriptionData
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

  async seedFromCardForm() {
    const raw = this.rawCardInfoService.cardData;

    const res = await this.prisma.member.findMany();

    const inPerviousForm = raw.filter((e) =>
      res.find(
        (e2) =>
          e.personalMail.toUpperCase() == e2.email.toUpperCase() ||
          Number(e.phone) === Number(e2.phone),
      ),
    );

    const [inprev, nonInPrev] = raw.reduce<RawCardInfo[][]>(
      (acc, cur) => {
        const isInPrev = !!res.find(
          (e2) =>
            cur.personalMail.toUpperCase() == e2.email.toUpperCase() ||
            Number(cur.phone) === Number(e2.phone),
        );
        acc[isInPrev ? 0 : 1].push(cur);
        return acc;
      },
      [[], []],
    );

    return { inprev, nonInPrev };
  }

  async DownloadImage(): Promise<string[]> {
    const all = await this.prisma.member.findMany();

    // get already downloaded pictures
    const currentPictures = await fs.promises.readdir(
      env.PICTURE_STORAGE_LOCATION,
    );

    // get non downloaded ids
    const ids = all
      .map((e) => e.imageDriveId)
      .filter((e) => currentPictures.find((el) => el === e));

    return this.googleDriveService.downloadFilesFromIds(ids);
  }
}
