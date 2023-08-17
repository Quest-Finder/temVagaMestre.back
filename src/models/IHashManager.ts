/* eslint-disable prettier/prettier */
export abstract class IHashManager {
  abstract hashGenerator(plaintext: string): Promise<string>;
  abstract compare(plaintex: string, hashtext: string): Promise<boolean>;
}
