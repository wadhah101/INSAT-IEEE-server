import { RawCardInfo } from '../../utils/raw/raw-card-info/entities/raw-card-info.entity';
import { Injectable } from '@nestjs/common';
import { Member } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { RawInscriptionInfo } from 'src/utils/raw/raw-card-info/entities/raw-inscription-info.entity';

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
      .map((e) => e.toMember())
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

    const inPrevWork = inprev.map((e) =>
      this.prisma.member.update(e.card.linkWithMember(e.inscription.id)),
    );

    const nonInPrevWork = nonInPrev.map((e) =>
      this.prisma.member.create(e.toNewMember()),
    );
    return this.prisma.$transaction([...inPrevWork, ...nonInPrevWork]);
  }
}
