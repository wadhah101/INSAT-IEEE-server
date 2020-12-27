import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GoogleDriveService } from 'src/utils/google-drive/google-drive.service';
import * as fileType from 'file-type';
import { join } from 'path';
import { env } from 'process';
import { promises as fs } from 'fs';

@Injectable()
export class MemberPicturesService {
  constructor(
    private prisma: PrismaService,
    private readonly googleDriveService: GoogleDriveService,
  ) {}

  async downloadImage() {
    const all = await this.prisma.member.findMany({
      select: { MemberBadge: true },
      where: { MemberBadge: { id: { not: null } } },
    });

    const downloadedImages = await fs.readdir(env.PICTURE_STORAGE_LOCATION_RAW);

    // get non downloaded ids
    const ids = all
      .map((e) => e.MemberBadge.imageDriveId)
      .filter((e) => !downloadedImages.find((el) => el === e));
    if (ids.length) await this.googleDriveService.downloadFilesFromIds(ids);
    return this.linkImages();
  }

  async linkImages() {
    const data = await this.prisma.member.findMany({
      include: { MemberBadge: true },
      where: { MemberBadge: { id: { not: null } } },
    });

    const withImagesReq = data.map(async (e) => {
      const oldPath = join(
        env.PICTURE_STORAGE_LOCATION_RAW,
        e.MemberBadge.imageDriveId,
      );
      const c = await fileType.fromFile(oldPath);

      // TODO add sharp
      const newName = `${e.fullName} ${e.id}.${c.ext}`;
      const newPath = join(env.PICTURE_STORAGE_LOCATION, newName);

      await fs.copyFile(oldPath, newPath);

      return { ...e, imageFile: newName };
    });

    return Promise.all(withImagesReq);
  }
}
