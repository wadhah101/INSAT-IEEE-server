import { RawCardInfo } from './entities/raw-card-info.entity';
import { RawInscriptionInfo } from './entities/raw-inscription-info.entity';
import { Injectable } from '@nestjs/common';
import * as Papa from 'papaparse';

@Injectable()
export class RawCardInfoService {
  async CardFormSetup(data: string) {
    // csv parsing
    const CardInfoReq = Papa.parse<RawCardInfo>(data, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (_, ind) => RawCardInfo.headerTransformer(ind),
      transform: (value) => value.trim(),
    }).data.map(async (e) => {
      await RawCardInfo.schema.validate(e);
      return e;
    });

    return Promise.all(CardInfoReq);
  }

  InscriptionFormSetup(data: string) {
    return Papa.parse<RawInscriptionInfo>(data, {
      header: true,
      transformHeader: (_, ind) => RawInscriptionInfo.headerTransformer(ind),
      transform: (e, field) => RawInscriptionInfo.transformer(e.trim(), field),
    }).data;
  }
}
