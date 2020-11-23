import { toFile as QrFile } from 'qrcode';
import { PrismaService } from './../prisma/prisma.service';
import { Controller, Get } from '@nestjs/common';
import { Member } from '@prisma/client';
import { join } from 'path';

@Controller('member')
export class MemberController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async getHello(): Promise<Member[]> {
    return this.prisma.member.findMany({ include: { ieeeAccount: true } });
  }

  @Get('qr')
  async genqQr(): Promise<string[]> {
    return [];
    const c = await this.getHello();
    const codes = c.map((e) =>
      QrFile(join(process.env.OUTPUT_QR, `${e.id}.png`), e.id, {
        margin: 1,
        scale: 20,
      }),
    );
    return Promise.all(codes);
  }
}
