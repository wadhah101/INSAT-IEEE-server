import { GoogleDriveService } from './google-drive.service';
import { PrismaService } from '../../prisma/prisma.service';
import { MemberService } from '../../member/services/member.service';
import { Module } from '@nestjs/common';
import { FormParserModule } from 'src/utils/raw/FormParser/FormParser.module';

@Module({
  imports: [FormParserModule],
  providers: [PrismaService, GoogleDriveService, MemberService],
  exports: [GoogleDriveService],
})
export class GoogleDriveModule {}
