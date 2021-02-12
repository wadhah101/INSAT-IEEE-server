import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import Papa from 'papaparse';
import qr from 'qrcode';

@Injectable()
export class MemberExportsService {
  constructor(private prisma: PrismaService) {}

  async exportToPhotoshopCSV(): Promise<string> {
    const raw = await this.prisma.member.findMany({
      include: { ieeeAccount: true },
      where: { MemberBadge: { wave: 2, paid: true } },
    });

    const data = raw.map((e) => ({
      ieeeId: e.ieeeAccount
        ? e.ieeeAccount.id > 1000
          ? e.ieeeAccount.id
          : 'xxxxxx'
        : null,
      fullName: e.fullName,
      imageFile: `${e.fullName} ${e.id}.jpeg`,
      qrCode: `${e.id}.png`,
    }));

    const result = Papa.unparse(data, { quotes: true });
    return result;
  }

  async genqQrs() {
    const c = await this.prisma.member.findMany({
      select: { id: true },
      where: { MemberBadge: { wave: 2, paid: true } },
    });

    const codesReq = c.map(async (e) => ({
      name: `${e.id}.png`,
      buffer: await qr.toBuffer(e.id, {
        margin: 1,
        scale: 20,
      }),
    }));

    return Promise.all(codesReq);
  }
}
