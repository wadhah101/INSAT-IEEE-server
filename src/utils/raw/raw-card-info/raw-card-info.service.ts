import { RawCardInfo } from './entities/raw-card-info.entity';
import { RawInscriptionInfo } from './entities/raw-inscription-info.entity';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { env } from 'process';
import { promises as fs } from 'fs';
import * as Papa from 'papaparse';

@Injectable()
export class RawCardInfoService implements OnModuleInit {
  public cardData: Promise<RawCardInfo[]>;
  public inscriptionData: Promise<RawInscriptionInfo[]>;

  // variables initiliazation
  onModuleInit() {
    // card form csv file location
    const cardFile = fs.readFile(env.FORM_DATA, 'utf-8');

    // non blocking csv parsing
    const CardInfoReq = cardFile
      .then((file) =>
        Papa.parse<RawCardInfo>(file, {
          header: true,
          skipEmptyLines: true,
          transformHeader: (_, ind) => RawCardInfo.headerTransformer(ind),
          transform: (value) => value.trim(),
        }),
      )
      .then((e) =>
        Promise.all(
          e.data.map(async (e) => {
            await RawCardInfo.schema.validate(e);
            return e;
          }),
        ),
      );

    this.cardData = CardInfoReq.catch((e) => {
      console.error(e);
      return null;
    });

    // inscription form csv data
    const inscriptionFile = fs.readFile(env.INSCRIPTION_DATA, 'utf-8');

    // non blocking csv parsing
    this.inscriptionData = inscriptionFile.then(
      (file) =>
        Papa.parse<RawInscriptionInfo>(file, {
          header: true,
          transformHeader: (_, ind) =>
            RawInscriptionInfo.headerTransformer(ind),
          transform: (e, field) =>
            RawInscriptionInfo.transformer(e.trim(), field),
        }).data,
    );
  }
}
