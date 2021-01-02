import { Injectable } from '@nestjs/common';
import { downloadFile, fullAuth } from './getToken';
import * as fs from 'fs';
import { join } from 'path';
import { env } from 'process';

@Injectable()
export class GoogleDriveService {
  async downloadFilesFromIds(ids: string[]) {
    const auth = await fullAuth();
    console.log('meta download Started');
    const idsReq = ids.map((e) => downloadFile(auth, e));
    const res = await Promise.all(idsReq);
    let counter = 0;
    const work = res.map((e) => {
      const file = fs.createWriteStream(
        join(env.PICTURE_STORAGE_LOCATION_RAW, e.fileId),
      );
      return new Promise<string>((resolve, reject) => {
        e.data.on('end', () => {
          console.log('download', e.fileId, `${++counter}/${ids.length}`);
          return resolve(e.fileId);
        });
        e.data.on('error', (error) => reject(error)).pipe(file);
      });
    });
    return Promise.all(work);
  }
}
