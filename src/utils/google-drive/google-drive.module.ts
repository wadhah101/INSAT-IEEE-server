import { GoogleDriveService } from './google-drive.service';
import { PrismaService } from '../../prisma/prisma.service';
import { MemberService } from '../../member/services/member.service';
import { Module } from '@nestjs/common';
import { FormParserModule } from 'src/utils/raw/raw-card-info/raw-card-info.module';
import { FormParserService } from 'src/utils/raw/raw-card-info/raw-card-info.service';

@Module({
  imports: [FormParserModule],
  providers: [
    PrismaService,
    GoogleDriveService,
    MemberService,
    FormParserService,
  ],
  exports: [GoogleDriveService],
})
export class GoogleDriveModule {}
