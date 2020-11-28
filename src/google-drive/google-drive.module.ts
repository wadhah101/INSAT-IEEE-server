import { GoogleDriveService } from './google-drive.service';
import { MemberModule } from './../member/member.module';
import { PrismaService } from './../prisma/prisma.service';
import { MemberService } from './../member/member.service';
import { Module } from '@nestjs/common';
import { RawCardInfoModule } from 'src/raw-card-info/raw-card-info.module';
import { RawCardInfoService } from 'src/raw-card-info/raw-card-info.service';

@Module({
  imports: [MemberModule, RawCardInfoModule],
  providers: [
    PrismaService,
    GoogleDriveService,
    MemberService,
    RawCardInfoService,
  ],
  exports: [GoogleDriveService],
})
export class GoogleDriveModule {}
