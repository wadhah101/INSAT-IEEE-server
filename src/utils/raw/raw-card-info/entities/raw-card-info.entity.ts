import { Gender, Prisma } from '@prisma/client';
import * as yup from 'yup'; // for everything

const chaptersPattern = /(PES)|(RAS)|(IAS)|(EMBS)|(CS)|(WIE)/g;

const namePattern = /(\S*)\s*/g;
export const nameTransformer = (value: string) =>
  Array.from(value.matchAll(namePattern))
    .map((e) => e[1])
    .map(
      (e) => e.toLowerCase().charAt(0).toUpperCase() + e.toLowerCase().slice(1),
    )
    .join(' ')
    .trim();

export class RawCardInfo {
  timestamp: string;
  fullName: string;
  ieeeMail: string;
  personalMail: string;
  phone: string;
  ieeeId: string;
  accountActivation: string;
  picture: string;

  static schema = yup.object().shape<RawCardInfo>({
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

export class RawInscriptionInfo {
  timestamp: string;
  firstName: string;
  lastName: string;
  gender: 'Male' | 'Female';
  email: string;
  phone: number;
  fbLink: string;
  studyField: string;
  studyLevel: number;
  chapters: string[];
  description: string;

  static cursedFacebookLinks = [
    'https://www.facebook.com/',
    'https://www.facebook.com/profile',
    'https://m.facebook.com/?_rdr',
    'https://m.facebook.com/?locale2=fr_FR',
    'https://m.facebook.com/',
    'https://m.facebook.com/profile.php?ref=bookmarks',
    'https://m.facebook.com/home.php',
  ];

  static headerTransformer = (index: number) =>
    [
      'timestamp',
      'firstName',
      'lastName',
      'gender',
      'email',
      'phone',
      'fbLink',
      'studyField',
      'studyLevel',
      'chapters',
      'description',
    ][index];

  static transformer = (value: string, field: string | number) => {
    switch (field) {
      case 'studyLevel':
      case 'phone':
        return Number.parseInt(value.replace(' ', ''));
      case 'chapters':
        return Array.from(value.match(chaptersPattern));
      case 'fbLink':
        return RawInscriptionInfo.cursedFacebookLinks.find((e) => e === value)
          ? null
          : value;
      default:
        return value;
    }
  };

  static toMember(e: RawInscriptionInfo): Prisma.MemberCreateInput {
    return {
      fullName: nameTransformer(`${e.firstName} ${e.lastName}`),
      gender: e.gender == 'Male' ? Gender.male : Gender.female,
      fbLink: e.fbLink,
      phone: e.phone,
      email: e.email,
      studyField: e.studyField,
      studyLevel: e.studyLevel,
    };
  }
}
