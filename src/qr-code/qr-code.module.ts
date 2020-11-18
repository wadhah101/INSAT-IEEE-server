import { PrismaService } from './../prisma/prisma.service';
import { Module } from '@nestjs/common';
import { QrCodeService } from './qr-code.service';
import { QrCodeController } from './qr-code.controller';

@Module({
  controllers: [QrCodeController],
  providers: [QrCodeService, PrismaService],
})
export class QrCodeModule {}
