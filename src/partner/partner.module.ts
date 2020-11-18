import { PrismaService } from './../prisma/prisma.service';
import { Module } from '@nestjs/common';
import { PartnerService } from './partner.service';
import { PartnerController } from './partner.controller';

@Module({
  imports: [PrismaService],
  providers: [PartnerService],
  controllers: [PartnerController],
})
export class PartnerModule {}
