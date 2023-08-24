/* eslint-disable prettier/prettier */
import { CustomError } from './CustomError';

export class Unauthorized extends CustomError {
  constructor() {
    super(401, 'Unauthorized user.');
  }
}

export class InvalidInstagramUrl extends CustomError {
  constructor() {
    super(422, 'Invalid instagram url.');
  }
}
