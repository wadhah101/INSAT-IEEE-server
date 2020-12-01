import {
  RawCardInfo,
  nameTransformer,
} from '../../utils/raw/raw-card-info/entities/raw-card-info.entity';
import { Injectable } from '@nestjs/common';
import { Member } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { RawInscriptionInfo } from 'src/utils/raw/raw-card-info/entities/raw-inscription-info.entity';
import { ieeeAccountFactory } from '../dto/create-member.dto';

@Injectable()
export class MemberService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Member[]> {
    return this.prisma.member.findMany({ include: { ieeeAccount: true } });
  }

  // takes data from inscription form csv and inserts it into database
  async seedFromInscriptionForm(data: RawInscriptionInfo[]) {
    // only leave unique inputs
    const raw = data
      .map((e) => RawInscriptionInfo.toMember(e))
      .filter(
        (e, ind, arr) =>
          ind ===
          arr.findIndex(
            (e2) =>
              (e.fbLink &&
                e2.fbLink &&
                e.fbLink.toUpperCase() === e2.fbLink.toUpperCase()) ||
              e2.phone == e.phone ||
              e2.email.toUpperCase() === e.email.toUpperCase(),
          ),
      );

    const req = raw.map((e) => this.prisma.member.create({ data: e }));
    return this.prisma.$transaction(req);
  }

  // takes data from cardForm csv and either links it with old member or creates new member
  async seedFromCardForm(data: RawCardInfo[]) {
    const pattern = /id=(.*)/;
    const res = await this.prisma.member.findMany();

    // classify members into two group ,  based on inscription form user record existance
    const [inprev, nonInPrev] = data.reduce<
      [{ inscription: Member; card: RawCardInfo }[], RawCardInfo[]]
    >(
      (acc, cur) => {
        const isInPrev = res.find(
          (e2) =>
            cur.personalMail.toUpperCase() == e2.email.toUpperCase() ||
            Number(cur.phone) === Number(e2.phone),
        );
        if (isInPrev) acc[0].push({ inscription: isInPrev, card: cur });
        else acc[1].push(cur);
        return acc;
      },
      [[], []],
    );
    const inPrevWork = inprev.map((e) => {
      const account = ieeeAccountFactory(e.card);
      return this.prisma.member.update({
        where: { id: e.inscription.id },
        data: {
          imageDriveId: e.card.picture.match(pattern)[1],
          ieeeAccount: account
            ? {
                create: account,
              }
            : undefined,
        },
      });
    });

    console.log(inprev);

    await this.prisma.$transaction(inPrevWork);

    const nonInPrevWork = nonInPrev.map((e) => {
      const account = ieeeAccountFactory(e);
      return this.prisma.member.create({
        data: {
          fullName: nameTransformer(e.fullName),
          email: e.personalMail,
          phone: Number(e.phone),
          imageDriveId: e.picture.match(pattern)[1],
          ieeeAccount: account
            ? {
                create: account,
              }
            : undefined,
        },
      });
    });
    return this.prisma.$transaction(nonInPrevWork);
  }
}
