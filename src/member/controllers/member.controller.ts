import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  SetMetadata,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MemberService } from '../services/member.service';
import { LocalGuard } from 'src/guards/local-guard/local.guard';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';
import { FormParserService } from 'src/utils/raw/FormParser/FormParser.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { IEEEAnlyticsElement } from 'src/utils/entities/IEEEAnlytics.entity';
import { CardFormV2Raw } from 'src/utils/raw/FormParser/entities/CardFormV2Raw.entity';
import { AmiraSheetElement } from 'src/utils/entities/AmiraSheet.entity';

@Controller('member')
@UseGuards(LocalGuard)
export class MemberController {
  constructor(
    private readonly memberService: MemberService,
    private readonly rawCardInfoService: FormParserService,
  ) {}

  @SetMetadata('NODE_ENV', 'development')
  @Get()
  async findAll() {
    return this.memberService.findAll();
  }

  @SetMetadata('NODE_ENV', 'development')
  @Post('seed/inscription')
  @UseInterceptors(FileInterceptor('file'))
  async loadInscriptionCSV(@UploadedFile() file: Express.Multer.File) {
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

    const data = this.rawCardInfoService.InscriptionFormRawParser(
      file.buffer.toString(),
    );

    return this.memberService.seedFromInscriptionForm(data);
  }

  @SetMetadata('NODE_ENV', 'development')
  @UseInterceptors(FileInterceptor('file'))
  async loadCardV1CSV(@UploadedFile() file: Express.Multer.File) {
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

    const data = await this.rawCardInfoService.CardFormV1RawParser(
      file.buffer.toString(),
    );

    return this.memberService.seedFromCardFormV1(data);
  }

  @SetMetadata('NODE_ENV', 'development')
  @Post('seed/cards')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'formFile', maxCount: 1 },
      { name: 'analyticsFile', maxCount: 1 },
      { name: 'amiraSheetFile', maxCount: 1 },
    ]),
  )
  async loadCardV2CSV(
    @UploadedFiles()
    {
      formFile,
      analyticsFile,
      amiraSheetFile,
    }: {
      formFile: Express.Multer.File[];
      analyticsFile: Express.Multer.File[];
      amiraSheetFile: Express.Multer.File[];
    },
  ) {
    const ieeeAnalyticsReq = IEEEAnlyticsElement.parser.fromCSV(
      analyticsFile[0].buffer.toString(),
    );

    const amiraReq = AmiraSheetElement.parser.fromCSV(
      amiraSheetFile[0].buffer.toString(),
    );

    const formReq = CardFormV2Raw.parser.fromCSV(formFile[0].buffer.toString());

    const [amira, ieeeAnalytics, form] = await Promise.all([
      amiraReq,
      ieeeAnalyticsReq,
      formReq,
    ]);

    return this.memberService.seedFromCardFormV2(amira, ieeeAnalytics, form);
  }

  @SetMetadata('NODE_ENV', 'development')
  @Post('seed/paiment')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'formFile', maxCount: 1 }]))
  async addPaidStatus(
    @UploadedFiles()
    { formFile }: { formFile: Express.Multer.File[] },
  ) {
    const formReq = await CardFormV2Raw.parser.fromCSV(
      formFile[0].buffer.toString(),
    );

    return this.memberService.fillPaid(formReq);
  }
}
