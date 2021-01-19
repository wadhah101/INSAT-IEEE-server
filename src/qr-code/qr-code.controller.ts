import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { QrCodeService } from './qr-code.service';
import { CreateQrCodeDto } from './dto/create-qr-code.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { QrCode } from './entities/qr-code.entity';

@Controller('qr-code')
@UsePipes(ValidationPipe)
export class QrCodeController {
  constructor(
    private readonly qrCodeService: QrCodeService,
    public readonly prisma: PrismaService,
  ) {}

  @Post()
  async create(@Body() createQrCodeDto: CreateQrCodeDto): Promise<QrCode> {
    return this.qrCodeService.create(createQrCodeDto);
  }
}
