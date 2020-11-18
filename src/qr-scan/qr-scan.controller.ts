import { PrismaService } from './../prisma/prisma.service';
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { QrScan } from '@prisma/client';

class ScanDto {
  @IsNotEmpty()
  @IsString()
  public code: string;

  @IsNotEmpty()
  @IsNumber()
  public id: number;
}

@Controller('qr-scan')
export class QrScanController {
  constructor(public readonly prisma: PrismaService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async scan(@Body() body: ScanDto): Promise<QrScan> {
    const partner = await this.prisma.partner.findOne({
      where: { code: body.code },
    });
    const member = await this.prisma.member.findOne({ where: { id: body.id } });

    if (!partner)
      throw new HttpException('Partner does not exist', HttpStatus.NOT_FOUND);
    if (!member)
      throw new HttpException('Member does not exist', HttpStatus.NOT_FOUND);
    if (!partner.active)
      throw new HttpException('Partner not active', HttpStatus.FORBIDDEN);

    const qr = await this.prisma.qrScan.create({
      data: {
        partner: { connect: { id: partner.id } },
        member: { connect: { id: member.id } },
        date: new Date(),
      },
    });

    return qr;
  }
}
