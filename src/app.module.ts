import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemberModule } from './member/member.module';
import { RunnerService } from './runner/runner.service';
import { PartnerModule } from './partner/partner.module';
import { QrCodeModule } from './qr-code/qr-code.module';
import { ConfigModule } from '@nestjs/config/dist/config.module';

@Module({
  imports: [ConfigModule.forRoot(), MemberModule, PartnerModule, QrCodeModule],
  controllers: [AppController],
  providers: [AppService, RunnerService],
})
export class AppModule {}
