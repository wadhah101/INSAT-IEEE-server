import { HttpException, HttpStatus } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';
import { validateSync } from 'class-validator';
import Papa from 'papaparse';

export class ParserCSV<T> {
  constructor(
    private readonly cls: ClassType<T>,

    private readonly headerTransformer?: (
      header: string,
      index: number,
    ) => string,
    private readonly transformer?: (
      value: string,
      field: string | number,
    ) => any,
  ) {}

  async parseMany(e: Record<string, any>[]): Promise<T[]> {
    const t = plainToClass(this.cls, e, {
      enableImplicitConversion: true,
    });

    const errors = validateSync(t, {
      skipMissingProperties: false,
    });

    if (errors.length > 0) {
      throw new HttpException(
        errors.toString(),
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return t;
  }
  parseOne = (e: Record<string, any>[]) =>
    this.parseMany([e]).then((e) => e[0]);

  async fromCSV(data: string): Promise<T[]> {
    const t = Papa.parse(data.trim(), {
      header: true,
      transformHeader: this.headerTransformer,
      transform: this.transformer,
    });

    return this.parseMany(t.data);
  }
}
