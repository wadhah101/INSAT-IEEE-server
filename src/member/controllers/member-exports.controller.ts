import { bufferToStream } from '../../utils/functions';
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
import * as AdmZip from 'adm-zip';
import { Response } from 'express';

@Controller('member/exports')
@UseGuards(LocalGuard)
export class MemberExportsController {
  constructor(private readonly memberExportsService: MemberExportsService) {}

  @SetMetadata('NODE_ENV', 'development')
  @Get('gen-qrs')
  @Header('Content-Type', 'application/zip')
  @Header('Content-Disposition', 'attachment; filename=MembersQrCodes.zip')
  @Header('X-Suggested-Filename', 'MembersQrCodes.zip')
  async genqQrs(@Res() res: Response) {
    const zip = new AdmZip();
    const result = await this.memberExportsService.genqQrs();

    result.forEach((e) => {
      zip.addFile(e.name, e.buffer);
    });

    const out = bufferToStream(zip.toBuffer());
    out.pipe(res);
  }

  @SetMetadata('NODE_ENV', 'development')
  @Get('photoshopCSV')
  @Header('Content-Disposition', 'attachment; filename=data.csv')
  @Header('X-Suggested-Filename', 'data.csv')
  @Header('Content-Type', 'text/csv')
  async photoshopCSV() {
    return this.memberExportsService.exportToPhotoshopCSV();
  }
}
