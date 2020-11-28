import { GoogleDriveService } from './google-drive.service';
import { PrismaService } from '../../prisma/prisma.service';
import { MemberService } from '../../member/member.service';
import { Module } from '@nestjs/common';
import { RawCardInfoModule } from 'src/utils/raw/raw-card-info/raw-card-info.module';
import { RawCardInfoService } from 'src/utils/raw/raw-card-info/raw-card-info.service';

@Module({
  imports: [RawCardInfoModule],
  providers: [
    PrismaService,
    GoogleDriveService,
    MemberService,
    RawCardInfoService,
  ],
  exports: [GoogleDriveService],
})
export class GoogleDriveModule {}
