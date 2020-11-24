import { GoogleDriveService } from './google-drive.service';
import { MemberModule } from './../member/member.module';
import { PrismaService } from './../prisma/prisma.service';
import { MemberService } from './../member/member.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [MemberModule],
  providers: [PrismaService, GoogleDriveService, MemberService],
  exports: [GoogleDriveService],
})
export class GoogleDriveModule {}
