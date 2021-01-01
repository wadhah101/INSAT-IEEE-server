import { CardFormV1Raw } from '../../utils/raw/FormParser/entities/CardFormV1Raw.entity';
import { Injectable } from '@nestjs/common';
import { Member } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { InscriptionFormRaw } from 'src/utils/raw/FormParser/entities/InscriptionFormRaw.entity';

@Injectable()
export class MemberService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Member[]> {
    return this.prisma.member.findMany({
      include: { ieeeAccount: true, chapters: true },
    });
  }

  /**
   * @deprecated
   */
  // takes data from inscription form csv and inserts it into database
  async seedFromInscriptionForm(data: InscriptionFormRaw[]) {
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

  /**
   * @deprecated
   */
  // takes data from cardForm csv and either links it with old member or creates new member
  async seedFromCardFormV1(data: CardFormV1Raw[]) {
    const res = await this.prisma.member.findMany();

    // classify members into two group ,  based on inscription form user record existance
    const [inprev, nonInPrev] = data.reduce<
      [{ inscription: Member; card: CardFormV1Raw }[], CardFormV1Raw[]]
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
