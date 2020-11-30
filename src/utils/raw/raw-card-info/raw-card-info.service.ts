import {
  RawCardInfo,
  RawInscriptionInfo,
} from './entities/raw-card-info.entity';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { env } from 'process';
import * as fs from 'fs';
import * as Papa from 'papaparse';

@Injectable()
export class RawCardInfoService implements OnApplicationBootstrap {
  public cardData: RawCardInfo[];
  public inscriptionData: RawInscriptionInfo[];
  async onApplicationBootstrap() {
    const cardFile = await fs.promises.readFile(env.FORM_DATA, 'utf-8');
    this.cardData = Papa.parse<RawCardInfo>(cardFile, {
      header: true,
      transformHeader: (_, ind) => RawCardInfo.headerTransformer(ind),
      transform: (value) => value.trim(),
    }).data;

    const inscriptionFile = await fs.promises.readFile(
      env.INSCRIPTION_DATA,
      'utf-8',
    );

    this.inscriptionData = Papa.parse<RawInscriptionInfo>(inscriptionFile, {
      header: true,
      transformHeader: (_, ind) => RawInscriptionInfo.headerTransformer(ind),
      transform: (e, field) => RawInscriptionInfo.transformer(e.trim(), field),
    }).data;
  }
}
