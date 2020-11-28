import {
  RawCardInfo,
  RawInscriptionInfo,
} from './entities/raw-card-info.entity';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { env } from 'process';
import { CreateRawCardInfoDto } from './dto/create-raw-card-info.dto';
import { UpdateRawCardInfoDto } from './dto/update-raw-card-info.dto';
import * as fs from 'fs';
import * as Papa from 'papaparse';

@Injectable()
export class RawCardInfoService implements OnApplicationBootstrap {
  private cardData: RawCardInfo[];
  private inscriptionData: RawInscriptionInfo[];
  async onApplicationBootstrap() {
    const cardFile = await fs.promises.readFile(env.FORM_DATA, 'utf-8');
    this.cardData = Papa.parse<RawCardInfo>(cardFile, {
      header: true,
      transformHeader: (_, ind) => RawCardInfo.headerTransformer(ind),
    }).data;

    const inscriptionFile = await fs.promises.readFile(
      env.INSCRIPTION_DATA,
      'utf-8',
    );

    this.inscriptionData = Papa.parse<RawInscriptionInfo>(inscriptionFile, {
      header: true,
      transformHeader: (_, ind) => RawInscriptionInfo.headerTransformer(ind),
      transform: (e, field) => RawInscriptionInfo.numberTransformer(e, field),
    }).data;
  }

  create(createRawCardInfoDto: CreateRawCardInfoDto) {
    return 'This action adds a new rawCardInfo';
  }

  findAll() {
    return this.inscriptionData;
  }

  findOne(id: number) {
    return `This action returns a #${id} rawCardInfo`;
  }

  update(id: number, updateRawCardInfoDto: UpdateRawCardInfoDto) {
    return `This action updates a #${id} rawCardInfo`;
  }

  remove(id: number) {
    return `This action removes a #${id} rawCardInfo`;
  }
}
