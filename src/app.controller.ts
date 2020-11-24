import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
// import * as axios from 'axios';
// import { Stream } from 'stream';

// const Fs = require('fs');
// const Path = require('path');

// async function downloadImage(id: string) {
//   const path = '/home/boogie/Downloads/out.png';

//   const writer = Fs.createWriteStream(path);
//   const instance = axios.default.create({
//     headers: {
//       Authorization:
//         'Bearer ya29.a0AfH6SMAMTGSvOUsPglPcSY86zTZIGnG6UyJ9GUZFdBOie2Qq9P6QFBNKC3oLm61YT6LG1BE-cArUhL5QY9CcNpZHO2LiKrN3i8MEhxAp-Bw2L1SRdVN_HNURnVBWzYfIW8oUgmd8G7XekftNCs1B6P42qP8kd4qBv4qXWzL5kGClS8yPXh5tBWgv3Fyd',
//     },
//   });

//   const resp1 = await instance.get(
//     `https://www.googleapis.com/drive/v2/files/${id}`,
//   );
//   console.log(resp1.data);

//   const downloadUrl = resp1.data?.downloadUrl;
//   const originalFileName = fileId?.
//   const picture = await instance.get<Stream>(downloadUrl, {
//     responseType: 'stream',
//   });

//   picture.data.pipe(writer);
//   return new Promise((resolve, reject) => {
//     writer.on('finish', resolve);
//     writer.on('error', reject);
//   });
// }

// const fileId = '1XHDiSsEpSCN6vXyxOuqqF4Z67jU63kqO';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<string> {
    return this.appService.getHello();
  }
}
