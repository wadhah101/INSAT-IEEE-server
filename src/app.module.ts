import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemberModule } from './member/member.module';
import { RunnerService } from './runner/runner.service';
import { ServiceModule } from './controller/service/service.module';

@Module({
  imports: [MemberModule, ServiceModule],
  controllers: [AppController],
  providers: [AppService, RunnerService],
})
export class AppModule {}
