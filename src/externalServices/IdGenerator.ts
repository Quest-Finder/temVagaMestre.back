/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common/decorators';
import { v4 } from 'uuid';
import { IIdGenerator } from '../models/IIdGenerator';

@Injectable()
export class IdGenerator implements IIdGenerator {
  generate(): string {
    return v4();
  }
}