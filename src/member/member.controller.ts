// import { toFile as QrFile } from 'qrcode';
import { PrismaService } from './../prisma/prisma.service';
import { Controller, Get } from '@nestjs/common';
import { Member } from '@prisma/client';
// import {join} from 'path';

@Controller('member')
export class MemberController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async getHello(): Promise<Member[]> {
    return this.prisma.member.findMany({ include: { ieeeAccount: true } });
  }

  // @Get('qr')
  // async genqQr(): Promise<string[]> {
  //   const c = await this.getHello();
  //   const codes = c.map(e =>
  //     QrFile(join(process.env.OUTPUT_QR, `${e.id}.svg`), e.id, { margin : 1} ),
  //   );
  //   return Promise.all(codes);
  // }
}
