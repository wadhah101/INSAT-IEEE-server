import { Gender, Prisma } from '@prisma/client';
const chaptersPattern = /(PES)|(RAS)|(IAS)|(EMBS)|(CS)|(WIE)/g;

export class RawCardInfo {
  timestamp: string;
  fullName: string;
  ieeeMail: string;
  personalMail: string;
  phone: number;
  ieeeId: number;
  accountActivation: string;
  picture: string;
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
    'https://m.facebook.com/profile.php?ref=bookmarks',
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
          : value.trim();
      default:
        return value;
    }
  };

  static toMember(e: RawInscriptionInfo): Prisma.MemberCreateInput {
    return {
      fullName: `${e.firstName} ${e.lastName}`.trim(),
      gender: e.gender == 'Male' ? Gender.male : Gender.female,
      fbLink: e.fbLink,
      phone: e.phone,
      email: e.email.trim(),
      studyField: e.studyField,
      studyLevel: e.studyLevel,
      // chapters: {
      //   connect: e.chapters.map((e) => ({
      //     acronym: e,
      //   })),
      // },
    };
  }
}
