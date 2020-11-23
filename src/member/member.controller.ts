import { toFile as QrFile } from 'qrcode';
import { PrismaService } from './../prisma/prisma.service';
import { Controller, Get } from '@nestjs/common';
import { Member } from '@prisma/client';
import { join as fsJoin } from 'path';
import { env } from 'process';

@Controller('member')
export class MemberController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async getHello(): Promise<Member[]> {
    if (env.NODE_ENV === 'production') return [];
    return this.prisma.member.findMany({ include: { ieeeAccount: true } });
  }

  @Get('qr')
  async genqQr(): Promise<string[]> {
    if (env.NODE_ENV === 'production') return [];
    const c = await this.getHello();
    const files = c.map((e) => ({
      path: fsJoin(process.env.OUTPUT_QR, `${e.id}.png`),
      data: e.id,
    }));

    const codes = files.map((e) =>
      QrFile(e.path, e.data, {
        margin: 1,
        scale: 20,
      }),
    );
    await Promise.all(codes);

    return files.map((e) => e.path);
  }
}
