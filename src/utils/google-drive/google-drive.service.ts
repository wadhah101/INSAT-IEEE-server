import {
  HttpException,
  HttpStatus,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { getAuthObject } from './getToken';
import * as fs from 'fs';
import { join } from 'path';
import { env } from 'process';
import { google } from 'googleapis';
import { Readable } from 'stream';

@Injectable()
export class GoogleDriveService implements OnModuleInit {
  private auth;

  async onModuleInit() {
    this.auth = await getAuthObject();
  }

  async getFileStream(fileId: string): Promise<Readable> {
    const drive = google.drive({ version: 'v3', auth: this.auth });
    const downloadReq = await drive.files
      .get(
        {
          fileId,
          alt: 'media',
        },
        { responseType: 'stream' },
      )
      .catch((e) => {
        throw new HttpException(e, HttpStatus.UNPROCESSABLE_ENTITY);
      });

    return downloadReq.data;
  }

  async downloadFile(fileId: string): Promise<string> {
    const downloadStream = await this.getFileStream(fileId);
    const localFile = fs.createWriteStream(
      join(env.PICTURE_STORAGE_LOCATION_RAW, fileId),
    );
    return new Promise<string>((resolve) => {
      downloadStream
        .on('end', () => {
          return resolve(fileId);
        })
        .pipe(localFile);
    });
  }

  async downloadFiles(filesIds: string[]): Promise<string[]> {
    const work = filesIds.map((e) => this.downloadFile(e));
    return Promise.all(work);
  }
}
