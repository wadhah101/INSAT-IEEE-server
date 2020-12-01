import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { join } from 'path';
import * as Papa from 'papaparse';
import { env } from 'process';
import * as qr from 'qrcode';

@Injectable()
export class MemberExportsService {
  constructor(private prisma: PrismaService) {}

  async exportToAnisCsv() {
    const raw = await this.prisma.member.findMany({
      select: { id: true, fullName: true, imageFile: true },
      where: { imageFile: { not: null } },
    });

    const data = raw.map((e) => ({
      fullName: e.fullName,
      imageFile: e.imageFile,
      qrCode: `${e.id}.png`,
    }));

    const result = Papa.unparse(data, { quotes: true });

    return result;
  }

  async genqQrs(): Promise<string[]> {
    const c = await this.prisma.member.findMany({
      select: { id: true },
      where: { imageFile: { not: null } },
    });
    const files = c.map((e) => ({
      path: join(env.OUTPUT_QR, `${e.id}.png`),
      data: e.id,
    }));

    const codes = files.map((e) =>
      qr.toFile(e.path, e.data, {
        margin: 1,
        scale: 20,
      }),
    );
    await Promise.all(codes);
    return files.map((e) => e.path);
  }
}
