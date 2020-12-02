import { Gender, Prisma } from '@prisma/client';
import { nameTransformer } from './raw-card-info.entity';

const chaptersPattern = /(PES)|(RAS)|(IAS)|(EMBS)|(CS)|(WIE)/g;

export interface IRawInscriptionInfo {
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

  static clone(e: IRawInscriptionInfo) {
    return Object.assign(new RawInscriptionInfo(), e);
  }

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

  toMember(): Prisma.MemberCreateInput {
    return {
      fullName: nameTransformer(`${this.firstName} ${this.lastName}`),
      gender: this.gender == 'Male' ? Gender.male : Gender.female,
      fbLink: this.fbLink,
      phone: this.phone,
      email: this.email.toLowerCase(),
      studyField: this.studyField,
      studyLevel: this.studyLevel,
    };
  }
}
