import { RawCardInfoService } from './../raw-card-info/raw-card-info.service';
import { Member } from '@prisma/client';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { downloadFiles, fullAuth } from './getToken';
import * as fs from 'fs';
import { join } from 'path';
import { env } from 'process';

interface ImageIdWithId {
  member: Member;
  imageId?: string;
}

@Injectable()
export class GoogleDriveService implements OnApplicationBootstrap {
  constructor(private readonly rawCardInfoService: RawCardInfoService) {}

  async getImageIdWithIds(members: Member[]): Promise<ImageIdWithId[]> {
    const pattern = /id=(.*)/;
    //   TODO make more rigid
    const imageIdWithIds = members.map((e) => ({
      imageId: e.imageUrl ? e.imageUrl.match(pattern)[1] : null,
      member: e,
    }));
    return imageIdWithIds;
  }

  async onApplicationBootstrap() {
    await this.rawCardInfoService.onApplicationBootstrap();
    const pattern = /id=(.*)/;
    const ids = this.rawCardInfoService.cardData.map(
      (e) => e.picture.match(pattern)[1],
    );

    const auth = await fullAuth();

    // TODO ONLY LAUNCH NON DOWNLOADED IDS
    const idsReq = ids.map((e) => downloadFiles(auth, e));

    const res = await Promise.all(idsReq);

    console.log('download Started');
    const work = res.map((e) => {
      const file = fs.createWriteStream(
        join(env.PICTURE_STORAGE_LOCATION, e.fileId),
      );
      return e.data
        .on('end', () => console.log('downloadEnded', e.fileId))
        .on('error', (err) => console.log('download error', err, e.fileId))
        .pipe(file);
    });
  }
}

//         fs.createWriteStream(join(env.PICTURE_STORAGE_LOCATION, e.fileId)),
