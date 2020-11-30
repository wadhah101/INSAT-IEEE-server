import { RawCardInfo } from 'src/utils/raw/raw-card-info/entities/raw-card-info.entity';

export class CreateMemberDto {}

const ieeeMailPattern = /.*@ieee\.org/;
const ieeeIdPattern = /^[0-9]{8}$/;
// ieee acount factory
export const ieeeAccountFactory = (e: RawCardInfo) =>
  e.ieeeMail.match(ieeeMailPattern) && e.ieeeId.match(ieeeIdPattern)
    ? {
        id: Number(e.ieeeId),
        email: e.ieeeMail,
        expirationDate:
          e.accountActivation === 'Before August 2020'
            ? new Date(2020, 11, 31)
            : new Date(2021, 11, 31),
      }
    : null;
