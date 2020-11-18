import { PrismaService } from './../prisma/prisma.service';
import { Injectable, ParseIntPipe, Query } from '@nestjs/common';
import { Member } from '@prisma/client';
import * as faker from 'faker';

const randomMembers = (quantity: number): Omit<Member, 'id'>[] =>
  new Array(quantity).fill(null).map(() => ({
    name: faker.name.firstName(),
    lastname: faker.name.lastName(),
    fbLink: faker.internet.url(),
    phone: 100000 + faker.random.number(100000),
    email: faker.internet.email(),
  }));

@Injectable()
export class MemberService {
  constructor(private readonly prisma: PrismaService) {}

  async fixtures(
    @Query('quantity', ParseIntPipe) quantity: number,
  ): Promise<Member[]> {
    const req = randomMembers(quantity).map(e =>
      this.prisma.member.create({ data: e }),
    );

    return Promise.all(req);
  }
}
