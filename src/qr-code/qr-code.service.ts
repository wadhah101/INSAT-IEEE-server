import { IEEEAccount, Member } from '@prisma/client';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateQrCodeDto } from './dto/create-qr-code.dto';
import { UpdateQrCodeDto } from './dto/update-qr-code.dto';
import { QrCode } from './entities/qr-code.entity';

@Injectable()
export class QrCodeService {
  constructor(public readonly prisma: PrismaService) {}

  // has account / don't have account / expired : test scenarios
  // partner disabled / enabled / wrong code
  async create(createQrCodeDto: CreateQrCodeDto): Promise<QrCode> {
    const partner = await this.prisma.partner.findOne({
      where: { code: createQrCodeDto.code },
    });
    const member = await this.prisma.member.findOne({
      where: { id: createQrCodeDto.id },
      include: { ieeeAccount: true },
    });

    if (!partner)
      throw new HttpException('Partner does not exist', HttpStatus.NOT_FOUND);
    if (!member)
      throw new HttpException('Member does not exist', HttpStatus.NOT_FOUND);
    if (!partner.active)
      throw new HttpException('Partner not active', HttpStatus.FORBIDDEN);

    const qr = this.prisma.qrScan.create({
      data: {
        partner: { connect: { id: partner.id } },
        member: { connect: { id: member.id } },
        date: new Date(),
      },
    });

    const res = {
      ...(await qr),
      hasIEEEAcount: !!member.ieeeAccount,
      expiredAccount: !!member.ieeeAccount && accountExpired(member),
    };

    return res;
  }

  findAll() {
    return `This action returns all qrCode`;
  }

  findOne(id: number) {
    return `This action returns a #${id} qrCode`;
  }

  update(id: number, updateQrCodeDto: UpdateQrCodeDto) {
    return `This action updates a #${id} qrCode`;
  }

  remove(id: number) {
    return `This action removes a #${id} qrCode`;
  }
}

function accountExpired(memeber: Member & { ieeeAccount: IEEEAccount }) {
  const Difference_In_Time =
    new Date().getTime() - memeber.ieeeAccount.registrationDate.getTime();

  // To calculate the no. of days between two dates
  const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

  return Difference_In_Days > 365 * 1.5;
}
