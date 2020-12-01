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

      await fs.copyFile(oldPath, newPath);

      return { ...e, imageFile: newName };
    });

    const withImages = await Promise.all(withImagesReq);

    const updates = withImages.map((e) =>
      this.prisma.member.update({ where: { id: e.id }, data: e }),
    );

    return this.prisma.$transaction(updates);
  }
}
