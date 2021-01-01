import { CardFormV1Raw } from 'src/utils/raw/FormParser/entities/CardFormV1Raw.entity';

export class CreateMemberDto {}

// ieee acount factory
export const ieeeAccountFactory = (e: CardFormV1Raw) =>
  e.ieeeId
    ? {
        id: Number(e.ieeeId),
        email: e.ieeeMail || null,
        expirationDate:
          e.accountActivation === 'Before August 2020'
            ? new Date(2020, 11, 31)
            : new Date(2021, 11, 31),
      }
    : null;
