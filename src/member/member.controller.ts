import { bufferToStream } from './../utils/functions';
import { MemberExportsService } from './services/member-exports.service';
import { MemberPicturesService } from './services/member-pictures.service';
import {
  Controller,
  Get,
  Header,
  HttpException,
  HttpStatus,
  Post,
  Res,
  SetMetadata,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MemberService } from './services/member.service';
import { LocalGuard } from 'src/guards/local-guard/local.guard';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';
import { RawCardInfoService } from 'src/utils/raw/raw-card-info/raw-card-info.service';
import * as AdmZip from 'adm-zip';
import { Response } from 'express';

@Controller('member')
@UseGuards(LocalGuard)
export class MemberController {
  constructor(
    private readonly memberService: MemberService,
    private readonly memberPicturesService: MemberPicturesService,
    private readonly memberExportsService: MemberExportsService,
    private readonly rawCardInfoService: RawCardInfoService,
  ) {}

  @SetMetadata('NODE_ENV', 'development')
  @Get()
  async findAll() {
    return this.memberService.findAll();
  }

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
  @Post('seed/inscription')
  @UseInterceptors(FileInterceptor('file'))
  async loadInscriptionCSV(
    @UploadedFile() file: { mimetype: string; buffer: Buffer },
  ) {
    if (!file)
      throw new HttpException(
        'Please upload a file',
        HttpStatus.FAILED_DEPENDENCY,
      );

    if (file.mimetype !== 'text/csv')
      throw new HttpException(
        'Please upload a valid CSV file',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    const data = this.rawCardInfoService.InscriptionFormSetup(
      file.buffer.toString(),
    );

    return this.memberService.seedFromInscriptionForm(data);
  }

  @SetMetadata('NODE_ENV', 'development')
  @Post('seed/cards')
  @UseInterceptors(FileInterceptor('file'))
  async loadCardCSV(
    @UploadedFile() file: { mimetype: string; buffer: Buffer },
  ) {
    if (!file)
      throw new HttpException(
        'Please upload a file',
        HttpStatus.FAILED_DEPENDENCY,
      );

    if (file.mimetype !== 'text/csv')
      throw new HttpException(
        'Please upload a valid CSV file',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    const data = await this.rawCardInfoService.CardFormSetup(
      file.buffer.toString(),
    );

    return this.memberService.seedFromCardForm(data);
  }

  @SetMetadata('NODE_ENV', 'development')
  @Get('downloadPics')
  async downloadPics() {
    return this.memberPicturesService.downloadImage();
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
