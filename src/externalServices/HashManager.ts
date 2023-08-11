/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common/decorators';
import * as bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
import { IHashManager } from '../models/IHashManager';

dotenv.config();

@Injectable()
export class HashManager implements IHashManager {
  public async hashGenerator(text: string): Promise<string> {
    const cost: number = Number(process.env.BCRYPT_COST);
    const salt = await bcrypt.genSalt(cost);
    const result = await bcrypt.hash(text, salt);
    return result;
  }

  public async compare(text: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(text, hash);
  }
}
