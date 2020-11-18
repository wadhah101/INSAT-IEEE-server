import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Partner } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';
import { PrismaService } from 'src/prisma/prisma.service';

class AuthDto {
  @IsString()
  @IsNotEmpty()
  public code: string;
}

@Controller('partner')
@UsePipes(ValidationPipe)
export class PartnerController {
  constructor(private readonly prisma: PrismaService) {}

  @Post('auth')
  async authentificate(@Body() { code }: AuthDto): Promise<Partner> {
    const res = await this.prisma.partner.findOne({
      where: { code },
    });
    if (!res) throw new HttpException('invalid code', HttpStatus.BAD_REQUEST);
    return res;
  }
}
