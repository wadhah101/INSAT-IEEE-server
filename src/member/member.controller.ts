import { Controller, Get, Header, Res } from '@nestjs/common';
import { MemberService } from './member.service';
import { env } from 'process';
import { Response } from 'express';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get()
  async findAll() {
    if (env.NODE_ENV === 'production') return [];
    return this.memberService.findAll();
  }

  @Get('gen-qrs')
  async genqQrs(): Promise<string[]> {
    if (env.NODE_ENV === 'production') return [];
    return this.memberService.genqQrs();
  }

  @Get('seed/inscription')
  async seedFromInscription() {
    if (env.NODE_ENV === 'production') return [];
    return this.memberService.seedFromInscription();
  }

  @Get('seed/cards')
  async seedFrom() {
    if (env.NODE_ENV === 'production') return [];
    return this.memberService.seedFromCardForm();
  }

  @Get('downloadPics')
  async downloadPics() {
    if (env.NODE_ENV === 'production') return [];
    return this.memberService.downloadImage();
  }

  @Get('linkPics')
  async linkPics() {
    if (env.NODE_ENV === 'production') return [];
    return this.memberService.linkImages();
  }

  @Get('anis.csv')
  @Header('Content-Type', 'text/csv')
  async anisCsv(@Res() res: Response) {
    if (env.NODE_ENV === 'production') return [];
    const data = await this.memberService.exportToAnisCsv();
    data.pipe(res);
  }
}
