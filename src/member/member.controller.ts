import { PrismaService } from './../prisma/prisma.service';
import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { Member } from '@prisma/client';
import * as faker from 'faker';

const randomMember = (): Omit<Member, 'id'> => {
  return {
    name: faker.name.firstName(),
    lastname: faker.name.lastName(),
    fbLink: faker.internet.url(),
    phone: 100000 + faker.random.number(100000),
    email: faker.internet.email(),
  };
};

@Controller('member')
export class MemberController {
  constructor(private prisma: PrismaService) {}

  @Get()
  getHello(): Promise<Member[]> {
    return this.prisma.member.findMany({ include: { ieeeAccount: true } });
  }

  @Get('seed')
  seed(@Query('quantity', ParseIntPipe) quantity: number): Promise<Member[]> {
    const req = new Array(quantity)
      .fill(null)
      .map(randomMember)
      .map(e => this.prisma.member.create({ data: e }));
    return Promise.all(req);
  }
}
