import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { QrCodeService } from './qr-code.service';
import { CreateQrCodeDto } from './dto/create-qr-code.dto';
import { UpdateQrCodeDto } from './dto/update-qr-code.dto';
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

  @Get()
  findAll() {
    return this.qrCodeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.qrCodeService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateQrCodeDto: UpdateQrCodeDto) {
    return this.qrCodeService.update(+id, updateQrCodeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.qrCodeService.remove(+id);
  }
}
