import { PrismaService } from './../../prisma/prisma.service';
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
import _ from 'lodash';
import { Prisma } from '@prisma/client';
import { phone } from 'faker';
import { AmiraSheetElement } from 'src/utils/entities/AmiraSheet.entity';

@Controller('member')
@UseGuards(LocalGuard)
export class MemberController {
  constructor(
    private readonly memberService: MemberService,
    private readonly rawCardInfoService: FormParserService,
    private readonly prisma: PrismaService,
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
  @Post('seed/cards')
  @UseInterceptors(FileInterceptor('file'))
  async loadCardCSV(@UploadedFile() file: Express.Multer.File) {
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
  @Post('demo')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'form', maxCount: 1 },
      { name: 'analytics', maxCount: 1 },
      { name: 'amiraSheet', maxCount: 1 },
    ]),
  )
  async meh(
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

    const allReq = this.prisma.member.findMany();

    const [amira, ieeeAnalytics, form, all] = await Promise.all([
      amiraReq,
      ieeeAnalyticsReq,
      formReq,
      allReq,
    ]);

    const matchyMatchy = form.map((e) => ({
      old: all.find(
        ({ phone, email }) =>
          phone === e.phoneNumber ||
          email.toLowerCase() === e.personalEmail.toLowerCase(),
      ),
      form: e,
      analytics: ieeeAnalytics.find(({ ieeeID }) => ieeeID === e.ieeeID),
      amira: amira.find(({ ieeeID }) => ieeeID === e.ieeeID),
    }));

    const [inOldForm, notInOldForm] = _.partition(matchyMatchy, (e) => e.old);

    const newInserts = notInOldForm.map((e) => {
      const ieeeMail = '';
      const c: Prisma.MemberCreateArgs = {
        data: {
          fullName: e.form.fullName,
          email: e.form.personalEmail,
          phone: e.form.phoneNumber,
          fbLink: e.amira?.fbLink,
          studyField: e.amira?.studyField,
          studyLevel: e.amira?.studyLevel,
          gender: e.amira?.gender || e.analytics?.gender,
          ieeeAccount: {
            create: {
              id: e.form.ieeeID,
              expirationDate: new Date(e.analytics.year + 1, 3, 1),
              email: ieeeMail,
            },
          },
        },
      };
      return c;
    });

    return { amira };
  }
}
