import { PrismaService } from './../prisma/prisma.service';
import { Controller, Get } from '@nestjs/common';
import { Member } from '@prisma/client';

@Controller('member')
export class MemberController {
  constructor(private prisma: PrismaService) {}

  @Get()
  getHello(): Promise<Member[]> {
    return this.prisma.member.findMany({ include: { ieeeAccount: true } });
  }
}
