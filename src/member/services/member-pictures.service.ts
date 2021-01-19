import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GoogleDriveService } from 'src/utils/google-drive/google-drive.service';
import * as fileType from 'file-type';
import { join } from 'path';
import { env } from 'process';

import { promises as fsp } from 'fs';
import fs from 'fs';
import _ from 'lodash';
import sharp from 'sharp';

@Injectable()
export class MemberPicturesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly googleDriveService: GoogleDriveService,
  ) {}

  // TODO add params : wave / exported
  async downloadImage(): Promise<string[]> {
    const all = await this.prisma.member.findMany({
      select: { MemberBadge: true },
      where: { MemberBadge: { wave: 2 } },
    });

    // search download directory for already downloaded image files
    const dir = env.PICTURE_STORAGE_LOCATION_RAW;
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const downloadedImages = await fsp.readdir(dir);

    // only download needed picture
    const nonDownloadedImages = _.difference(
      all.map((e) => e.MemberBadge.imageDriveId),
      downloadedImages,
    );

    console.log('downloading', nonDownloadedImages);

    return nonDownloadedImages.length
      ? this.googleDriveService.downloadFiles(nonDownloadedImages)
      : [];
  }

  async linkImages() {
    const data = await this.prisma.member.findMany({
      include: { MemberBadge: true },
      where: { MemberBadge: { wave: 2 } },
    });

    const withImagesReq = data.map(async (e) => {
      const oldPath = join(
        env.PICTURE_STORAGE_LOCATION_RAW,
        e.MemberBadge.imageDriveId,
      );
      const initFile = await fsp.readFile(oldPath);
      const fileBuffer = await sharp(initFile)
        .resize({ width: 1280, withoutEnlargement: true })
        .jpeg()
        .toBuffer();

      // TODO transform with sharp
      const newName = `${e.fullName} ${e.id}.jpeg`;
      return { name: newName, fileBuffer, memberId: e.id };
    });

    return Promise.all(withImagesReq);
  }
}
