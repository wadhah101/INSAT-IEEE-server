import { RawCardInfo } from 'src/utils/raw/raw-card-info/entities/raw-card-info.entity';

export class CreateMemberDto {}

// ieee acount factory
export const ieeeAccountFactory = (e: RawCardInfo) =>
  e.ieeeMail && e.ieeeId
    ? {
        id: Number(e.ieeeId),
        email: e.ieeeMail,
        expirationDate:
          e.accountActivation === 'Before August 2020'
            ? new Date(2020, 11, 31)
            : new Date(2021, 11, 31),
      }
    : null;
