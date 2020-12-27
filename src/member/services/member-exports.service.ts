import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as Papa from 'papaparse';
import * as qr from 'qrcode';

@Injectable()
export class MemberExportsService {
  constructor(private prisma: PrismaService) {}

  async exportToAnisCsv() {
    const raw = await this.prisma.member.findMany({
      select: {
        id: true,
        fullName: true,
        ieeeAccount: true,
        MemberBadge: true,
      },
      where: { MemberBadge: { id: { not: null } } },
    });

    //  imageFile: { not: null }

    const data = raw.map((e) => ({
      ieeeId: e.ieeeAccount ? e.ieeeAccount.id : null,
      fullName: e.fullName,
      // TODO
      imageFile: e.MemberBadge.imageDriveId,
      qrCode: `${e.id}.png`,
    }));

    const result = Papa.unparse(data, { quotes: true });

    return result;
  }

  async genqQrs() {
    const c = await this.prisma.member.findMany({
      select: { id: true },
      where: { MemberBadge: { id: { not: null } } },
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
