import { GoogleDriveService } from './../utils/google-drive/google-drive.service';
import { GoogleDriveModule } from './../utils/google-drive/google-drive.module';
import { Module } from '@nestjs/common';
import { MemberService } from './services/member.service';
import { MemberController } from './member.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { RawCardInfoModule } from 'src/utils/raw/raw-card-info/raw-card-info.module';
import { MemberPicturesService } from './services/member-pictures.service';
import { MemberExportsService } from './services/member-exports.service';

@Module({
  imports: [GoogleDriveModule, RawCardInfoModule],
  controllers: [MemberController],
  providers: [
    MemberExportsService,
    MemberService,
    GoogleDriveService,
    PrismaService,
    MemberPicturesService,
  ],
  exports: [MemberService],
})
export class MemberModule {}
