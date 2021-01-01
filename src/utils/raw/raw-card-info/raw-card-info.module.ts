import { PrismaService } from 'src/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { FormParserService } from './raw-card-info.service';

@Module({
  providers: [FormParserService, PrismaService],
  exports: [FormParserService],
})
export class FormParserModule {}
