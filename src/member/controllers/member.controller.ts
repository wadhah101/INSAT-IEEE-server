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
import _, { CondPair } from 'lodash';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import Papa from 'papaparse';

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
    files: {
      form: Express.Multer.File[];
      analytics: Express.Multer.File[];
      amiraSheet: Express.Multer.File[];
    },
  ) {
    // WORKFLOW
    // get element from form
    // search old data
    // search analytics
    // search amiraSheet

    // if not found in old data create new account and fill info from analytics  and amira sheet

    const mapFunctionGen = (
      indexIn: number,
      name: string,
    ): CondPair<number, string> => [(e) => e === indexIn, () => name];
    const mapFunction = _.cond<number, string>([
      mapFunctionGen(3, 'ieeeID'),
      mapFunctionGen(14, 'year'),
      mapFunctionGen(9, 'email'),
      [() => true, () => undefined],
    ]);
    const t = Papa.parse(files.analytics[0].buffer.toString().trim(), {
      header: true,
      transformHeader: (header, index) => {
        // console.log(header, index);
        return mapFunction(index);
      },
    });

    return t.data;
  }
}
