import { PrismaService } from 'src/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { RawCardInfoService } from './raw-card-info.service';
import { RawCardInfoController } from './raw-card-info.controller';

@Module({
  controllers: [RawCardInfoController],
  providers: [RawCardInfoService, PrismaService],
  exports: [RawCardInfoService],
})
export class RawCardInfoModule {}
