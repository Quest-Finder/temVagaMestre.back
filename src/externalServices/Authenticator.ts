/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common/decorators';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { AuthenticationData } from '../models/AuthenticationData';
import { IAuthenticator } from '../models/IAuthenticator';
import { Unauthorized } from '../errors/PlayerErrors';

dotenv.config();

@Injectable()
export class Authenticator implements IAuthenticator {
  public generateToken = ({ id }: AuthenticationData): string => {
    const token = jwt.sign(
      { id },
      process.env.JWT_KEY as string, 
      {expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN}
    );

    return token;
  };

  public getData = (token: string): AuthenticationData => {
    try {
      const payload = jwt.verify(
        token,
        process.env.JWT_KEY as string,
      ) as AuthenticationData;

      return payload;
    } catch (err: any) {
      console.log("error: ", err.message)
      throw new Unauthorized();
    }
  };
}
