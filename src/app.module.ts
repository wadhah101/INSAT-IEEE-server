import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemberModule } from './member/member.module';
import { RunnerService } from './runner/runner.service';
import { PartnerModule } from './partner/partner.module';
import { QrCodeModule } from './qr-code/qr-code.module';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { GoogleDriveService } from './google-drive/google-drive.service';
import { GoogleDriveModule } from './google-drive/google-drive.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GoogleDriveModule,
    MemberModule,
    PartnerModule,
    QrCodeModule,
    GoogleDriveModule,
  ],
  controllers: [AppController],
  providers: [AppService, RunnerService],
})
export class AppModule {}
