/* eslint-disable prettier/prettier */
import { AuthenticationData } from './AuthenticationData';

export abstract class IAuthenticator {
  abstract generateToken({ id }: AuthenticationData): string;
  abstract getData(token: string): AuthenticationData;
}
