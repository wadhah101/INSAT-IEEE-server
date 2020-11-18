import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemberModule } from './member/member.module';
import { RunnerService } from './runner/runner.service';
import { QrScanModule } from './qr-scan/qr-scan.module';
import { PartnerModule } from './partner/partner.module';

@Module({
  imports: [MemberModule, QrScanModule, PartnerModule],
  controllers: [AppController],
  providers: [AppService, RunnerService],
})
export class AppModule {}
