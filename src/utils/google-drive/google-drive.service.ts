import { Injectable } from '@nestjs/common';
import { downloadFiles, fullAuth } from './getToken';
import * as fs from 'fs';
import { join } from 'path';
import { env } from 'process';

@Injectable()
export class GoogleDriveService {
  async downloadFilesFromIds(ids: string[]) {
    const auth = await fullAuth();
    console.log('meta download Started');
    const idsReq = ids.map((e) => downloadFiles(auth, e));
    const res = await Promise.all(idsReq);
    const work = res.map((e) => {
      const file = fs.createWriteStream(
        join(env.PICTURE_STORAGE_LOCATION, e.fileId),
      );
      return new Promise<string>((resolve, reject) => {
        e.data.on('end', () => {
          console.log('download', e.fileId);
          return resolve(e.fileId);
        });
        e.data.on('error', (error) => reject(error)).pipe(file);
      });
    });
    return Promise.all(work);
  }
}
