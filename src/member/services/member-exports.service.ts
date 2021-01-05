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
      where: { MemberBadge: { isNot: null } },
    });

    const data = raw.map((e) => ({
      ieeeId: e.ieeeAccount ? e.ieeeAccount.id : null,
      fullName: e.fullName,
      // TODO fix file extension
      imageFile: `${e.fullName} ${e.id}.jpg`,
      qrCode: `${e.id}.png`,
    }));

    const result = Papa.unparse(data, { quotes: true });
    return result;
  }

  async genqQrs() {
    const c = await this.prisma.member.findMany({
      select: { id: true },
      where: { MemberBadge: { isNot: null } },
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
