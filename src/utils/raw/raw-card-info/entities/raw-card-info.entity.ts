import { Prisma } from '@prisma/client';
import { ieeeAccountFactory } from 'src/member/dto/create-member.dto';
import * as yup from 'yup'; // for everything

const namePattern = /(\S*)\s*/g;
export const nameTransformer = (value: string) =>
  Array.from(value.matchAll(namePattern))
    .map((e) => e[1])
    .map(
      (e) => e.toLowerCase().charAt(0).toUpperCase() + e.toLowerCase().slice(1),
    )
    .join(' ')
    .trim();

export interface IRawCardInfo {
  timestamp: string;
  fullName: string;
  ieeeMail: string;
  personalMail: string;
  phone: string;
  ieeeId: string;
  accountActivation: string;
  picture: string;
}

export class RawCardInfo implements IRawCardInfo {
  timestamp: string;
  fullName: string;
  ieeeMail: string;
  personalMail: string;
  phone: string;
  ieeeId: string;
  accountActivation: string;
  picture: string;

  static clone(e: IRawCardInfo): RawCardInfo {
    return Object.assign(new RawCardInfo(), e);
  }

  static imageDrivePattern = /id=(.*)/;

  linkWithMember(id: string): Prisma.MemberUpdateArgs {
    const account = ieeeAccountFactory(this);
    return {
      where: { id },
      data: {
        MemberBadge: {
          create: {
            // TODO
            wave: 1,
            imageDriveId: this.picture.match(RawCardInfo.imageDrivePattern)[1],
          },
        },
        ieeeAccount: account
          ? {
              create: account,
            }
          : undefined,
      },
    };
  }

  toNewMember(): Prisma.MemberCreateArgs {
    const account = ieeeAccountFactory(this);
    return {
      data: {
        fullName: nameTransformer(this.fullName),
        email: this.personalMail,
        phone: Number(this.phone),
        MemberBadge: {
          create: {
            // TODO
            wave: 1,
            imageDriveId: this.picture.match(RawCardInfo.imageDrivePattern)[1],
          },
        },
        ieeeAccount: account
          ? {
              create: account,
            }
          : undefined,
      },
    };
  }

  static schema = yup.object().shape<IRawCardInfo>({
    timestamp: null,
    fullName: yup.string().required(),
    ieeeMail: yup.string().matches(/.+@ieee\.org|/),
    personalMail: yup.string().required().email(),
    phone: yup.string().required(),
    ieeeId: yup.string().matches(/[0-9]{8}|/),
    accountActivation: yup.string(),
    picture: yup.string().required().url(),
  });

  static headerTransformer = (index: number) =>
    [
      'timestamp',
      'fullName',
      'ieeeMail',
      'personalMail',
      'phone',
      'ieeeId',
      'accountActivation',
      'picture',
    ][index];
}
