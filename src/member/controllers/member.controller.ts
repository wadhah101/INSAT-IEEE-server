import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  SetMetadata,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MemberService } from '../services/member.service';
import { LocalGuard } from 'src/guards/local-guard/local.guard';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';
import { FormParserService } from 'src/utils/raw/FormParser/FormParser.service';
import Papa from 'papaparse';
import _, { CondPair } from 'lodash';

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

    const data = this.rawCardInfoService.InscriptionFormRawParser(
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

    const data = await this.rawCardInfoService.CardFormV1RawParser(
      file.buffer.toString(),
    );

    return this.memberService.seedFromCardFormV1(data);
  }

  @SetMetadata('NODE_ENV', 'development')
  @Post('demo')
  @UseInterceptors(FileInterceptor('file'))
  async meh(@UploadedFile() file: { mimetype: string; buffer: Buffer }) {
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
    const t = Papa.parse(file.buffer.toString().trim(), {
      header: true,
      transformHeader: (header, index) => {
        // console.log(header, index);
        return mapFunction(index);
      },
    });

    return t.data;
  }
}
