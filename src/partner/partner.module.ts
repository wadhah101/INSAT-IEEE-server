import { PrismaService } from './../prisma/prisma.service';
import { Module } from '@nestjs/common';
import { PartnerService } from './partner.service';
import { PartnerController } from './partner.controller';

@Module({
  imports: [],
  providers: [PartnerService, PrismaService],
  controllers: [PartnerController],
})
export class PartnerModule {}
