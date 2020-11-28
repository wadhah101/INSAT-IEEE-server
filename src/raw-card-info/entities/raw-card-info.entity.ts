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
  perosnalEmail: string;
  phone: number;
  facebook: string;
  studyField: number;
  studyLevel: number;
  chapters: string;
  description: string;
  static headerTransformer = (index: number) =>
    [
      'timestamp',
      'firstName',
      'lastName',
      'gender',
      'perosnalEmail',
      'phone',
      'facebook',
      'studyField',
      'studyLevel',
      'chapters',
      'description',
    ][index];

  static numberTransformer = (value: string, field: string | number) => {
    switch (field) {
      case 'studyLevel':
      case 'phone':
        return Number.parseInt(value.replace(' ', ''));
      case 'chapters':
        return Array.from(value.match(chaptersPattern));
      default:
        return value;
    }
  };
}
