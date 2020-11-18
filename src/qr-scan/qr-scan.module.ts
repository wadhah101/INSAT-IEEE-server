import { PrismaService } from './../prisma/prisma.service';
import { Module } from '@nestjs/common';
import { QrScanService } from './qr-scan.service';
import { QrScanController } from './qr-scan.controller';

@Module({
  imports: [PrismaService],
  providers: [QrScanService],
  controllers: [QrScanController],
})
export class QrScanModule {}
