import { MemberPicturesService } from './../services/member-pictures.service';
import { MemberExportsService } from '../services/member-exports.service';
import {
  Controller,
  Get,
  Header,
  Res,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { LocalGuard } from 'src/guards/local-guard/local.guard';
import AdmZip from 'adm-zip';
import { Response } from 'express';

@Controller('member/exports')
@UseGuards(LocalGuard)
export class MemberExportsController {
  constructor(
    private readonly memberExportsService: MemberExportsService,
    private readonly memberPicturesService: MemberPicturesService,
  ) {}

  @SetMetadata('NODE_ENV', 'development')
  @Get('gen-qrs')
  @Header('Content-Type', 'application/zip')
  @Header('Content-Disposition', 'attachment; filename=MembersQrCodes.zip')
  @Header('X-Suggested-Filename', 'MembersQrCodes.zip')
  async genqQrs(@Res() res: Response) {
    const zip = new AdmZip();
    const [result, photoshopCSV, pictures] = await Promise.all([
      this.memberExportsService.genqQrs(),
      this.memberExportsService.exportToPhotoshopCSV(),
      this.memberPicturesService.linkImages(),
    ]);

    // Add Qr codes
    result.forEach((e) => {
      zip.addFile(`QR-codes/${e.name}`, e.buffer);
    });

    // Add Member pictures
    pictures.forEach((e) => {
      zip.addFile(`picture/${e.name}`, e.fileBuffer);
    });

    // Add data
    zip.addFile('data.csv', Buffer.from(photoshopCSV, 'utf-8'));

    res.end(zip.toBuffer());
  }
}
