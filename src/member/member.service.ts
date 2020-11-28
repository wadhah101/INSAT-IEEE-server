import { Injectable } from '@nestjs/common';
import { Member } from '@prisma/client';
import { env } from 'process';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { toFile as QrFile } from 'qrcode';
import { join as fsJoin } from 'path';
import { GoogleDriveService } from 'src/utils/google-drive/google-drive.service';
import * as fs from 'fs';

@Injectable()
export class MemberService {
  constructor(
    private prisma: PrismaService,
    private readonly googleDriveService: GoogleDriveService,
  ) {}
  create(createMemberDto: CreateMemberDto) {
    return 'This action adds a new member';
  }

  async findAll(): Promise<Member[]> {
    return this.prisma.member.findMany({ include: { ieeeAccount: true } });
  }

  findOne(id: number) {
    return `This action returns a #${id} member`;
  }

  update(id: number, updateMemberDto: UpdateMemberDto) {
    return `This action updates a #${id} member`;
  }

  remove(id: number) {
    return `This action removes a #${id} member`;
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

  async DownloadImage(): Promise<string[]> {
    const all = await this.prisma.member.findMany();

    // get already downloaded pictures
    const currentPictures = await fs.promises.readdir(
      env.PICTURE_STORAGE_LOCATION,
    );

    // get non downloaded ids
    const ids = all
      .map((e) => e.imageId)
      .filter((e) => currentPictures.find((el) => el === e));

    return this.googleDriveService.downloadFilesFromIds(ids);
  }
}
