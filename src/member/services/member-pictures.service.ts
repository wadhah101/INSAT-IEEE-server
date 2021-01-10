import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GoogleDriveService } from 'src/utils/google-drive/google-drive.service';
import * as fileType from 'file-type';
import { join } from 'path';
import { env } from 'process';
import { promises as fs } from 'fs';
import _ from 'lodash';

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
      where: { MemberBadge: { isNot: null } },
    });

    // TODO add directory existance check
    // search download directory for already downloaded image files
    const downloadedImages = await fs.readdir(env.PICTURE_STORAGE_LOCATION_RAW);

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
      where: { MemberBadge: { isNot: null } },
    });

    const withImagesReq = data.map(async (e) => {
      const oldPath = join(
        env.PICTURE_STORAGE_LOCATION_RAW,
        e.MemberBadge.imageDriveId,
      );
      const fileBuffer = await fs.readFile(oldPath);
      const c = await fileType.fromBuffer(fileBuffer);

      const newName = `${e.fullName} ${e.id}.${c.ext}`;
      return { name: newName, fileBuffer, memberId: e.id };
    });

    return Promise.all(withImagesReq);
  }
}
