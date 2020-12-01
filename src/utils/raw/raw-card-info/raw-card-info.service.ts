import {
  RawCardInfo,
  RawInscriptionInfo,
} from './entities/raw-card-info.entity';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { env } from 'process';
import { promises as fs } from 'fs';
import * as Papa from 'papaparse';

@Injectable()
export class RawCardInfoService implements OnModuleInit {
  public cardData: Promise<RawCardInfo[]>;
  public inscriptionData: RawInscriptionInfo[];
  async onModuleInit() {
    // card form csv file location
    const cardFile = await fs.readFile(env.FORM_DATA, 'utf-8');

    // csv parsing
    const CardInfoReq = Papa.parse<RawCardInfo>(cardFile, {
      header: true,
      transformHeader: (_, ind) => RawCardInfo.headerTransformer(ind),
      transform: (value) => value.trim(),
    }).data.map(async (e) => {
      await RawCardInfo.schema.validate(e);
      return e;
    });

    this.cardData = Promise.all(CardInfoReq);

    // inscription form csv data
    const inscriptionFile = await fs.readFile(env.INSCRIPTION_DATA, 'utf-8');

    // csv parsing
    this.inscriptionData = Papa.parse<RawInscriptionInfo>(inscriptionFile, {
      header: true,
      transformHeader: (_, ind) => RawInscriptionInfo.headerTransformer(ind),
      transform: (e, field) => RawInscriptionInfo.transformer(e.trim(), field),
    }).data;
  }
}
