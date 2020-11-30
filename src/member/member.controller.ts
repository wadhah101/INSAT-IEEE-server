import {
  Controller,
  Get,
  Header,
  Res,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { Response } from 'express';
import { LocalGuard } from 'src/guards/local-guard/local.guard';

@Controller('member')
@UseGuards(LocalGuard)
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @SetMetadata('NODE_ENV', 'development')
  @Get()
  async findAll() {
    return this.memberService.findAll();
  }

  @SetMetadata('NODE_ENV', 'development')
  @Get('gen-qrs')
  async genqQrs(): Promise<string[]> {
    return this.memberService.genqQrs();
  }

  @SetMetadata('NODE_ENV', 'development')
  @Get('seed/inscription')
  async seedFromInscription() {
    return this.memberService.seedFromInscription();
  }

  @SetMetadata('NODE_ENV', 'development')
  @Get('seed/cards')
  async seedFrom() {
    return this.memberService.seedFromCardForm();
  }

  @SetMetadata('NODE_ENV', 'development')
  @Get('downloadPics')
  async downloadPics() {
    return this.memberService.downloadImage();
  }

  @SetMetadata('NODE_ENV', 'development')
  @Get('linkPics')
  async linkPics() {
    return this.memberService.linkImages();
  }

  @SetMetadata('NODE_ENV', 'development')
  @Get('anis.csv')
  @Header('Content-Type', 'text/csv')
  async anisCsv(@Res() res: Response) {
    const data = await this.memberService.exportToAnisCsv();
    data.pipe(res);
  }
}
