import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateQrCodeDto } from './dto/create-qr-code.dto';
import { UpdateQrCodeDto } from './dto/update-qr-code.dto';
import { QrCode } from './entities/qr-code.entity';

@Injectable()
export class QrCodeService {
  constructor(public readonly prisma: PrismaService) {}

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

    const res = { ...(await qr), hasIEEEAcount: !!member.ieeeAccount };

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
