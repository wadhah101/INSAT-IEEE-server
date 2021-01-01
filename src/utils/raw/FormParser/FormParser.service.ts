import { ICardFormV1Raw, CardFormV1Raw } from './entities/CardFormV1Raw.entity';
import {
  IInscriptionFormRaw,
  InscriptionFormRaw,
} from './entities/InscriptionFormRaw.entity';
import { Injectable } from '@nestjs/common';
import * as Papa from 'papaparse';

@Injectable()
export class FormParserService {

  
  async CardFormV1RawParser(data: string) {
    const CardInfoReq = Papa.parse<ICardFormV1Raw>(data, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (_, ind) => CardFormV1Raw.headerTransformer(ind),
      transform: (value) => value.trim(),
    }).data.map((e) => {
      CardFormV1Raw.schema.validateSync(e);
      return CardFormV1Raw.clone(e);
    });

    return CardInfoReq;
  }

  InscriptionFormRawParser(data: string) {
    return Papa.parse<IInscriptionFormRaw>(data, {
      header: true,
      transformHeader: (_, ind) => InscriptionFormRaw.headerTransformer(ind),
      transform: (e, field) => InscriptionFormRaw.transformer(e.trim(), field),
    }).data.map((e) => InscriptionFormRaw.clone(e));
  }
}
