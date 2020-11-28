import { GoogleDriveService } from './../utils/google-drive/google-drive.service';
import { GoogleDriveModule } from './../utils/google-drive/google-drive.module';
import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { RawCardInfoModule } from 'src/utils/raw/raw-card-info/raw-card-info.module';

@Module({
  imports: [GoogleDriveModule, RawCardInfoModule],
  controllers: [MemberController],
  providers: [MemberService, GoogleDriveService, PrismaService],
  exports: [MemberService],
})
export class MemberModule {}
