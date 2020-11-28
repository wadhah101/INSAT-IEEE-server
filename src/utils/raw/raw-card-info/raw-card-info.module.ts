import { PrismaService } from 'src/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { RawCardInfoService } from './raw-card-info.service';

@Module({
  providers: [RawCardInfoService, PrismaService],
  exports: [RawCardInfoService],
})
export class RawCardInfoModule {}
