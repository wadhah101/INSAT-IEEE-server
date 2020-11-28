import { Controller, Get } from '@nestjs/common';
import { MemberService } from './member.service';
import { env } from 'process';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get()
  async findAll(): Promise<string[]> {
    if (env.NODE_ENV === 'production') return [];
    return this.memberService.DownloadImage();
  }

  @Get('gen-qrs')
  async genqQrs(): Promise<string[]> {
    if (env.NODE_ENV === 'production') return [];
    return this.memberService.genqQrs();
  }

  @Get('seed/inscription')
  async seedFromInscription() {
    return this.memberService.seedFromInscription();
  }

  @Get('seed/cards')
  async seedFrom() {
    return this.memberService.seedFromCardForm();
  }
}
