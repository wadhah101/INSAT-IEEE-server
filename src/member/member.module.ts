import { MemberService } from './member.service';
import { PrismaService } from './../prisma/prisma.service';
import { MemberController } from './member.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [MemberController],
  providers: [MemberService, PrismaService],
})
export class MemberModule {}
