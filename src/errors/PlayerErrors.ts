/* eslint-disable prettier/prettier */
import { CustomError } from './CustomError';

export class Unauthorized extends CustomError {
  constructor() {
    super(401, 'Unauthorized user.');
  }
}
