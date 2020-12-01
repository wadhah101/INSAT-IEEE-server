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
