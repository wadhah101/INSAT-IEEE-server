import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { Partner } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('partner')
export class PartnerController {
  constructor(private readonly prisma: PrismaService) {}

  @Post('auth')
  async authentificate(@Body('code') code: string): Promise<Partner> {
    if (!code)
      throw new HttpException(
        'no code provided in body',
        HttpStatus.BAD_REQUEST,
      );
    const res = await this.prisma.partner.findOne({
      where: { code },
    });
    if (!res) throw new HttpException('invalid code', HttpStatus.BAD_REQUEST);
    return res;
  }
}
