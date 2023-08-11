/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CustomError } from 'src/errors/CustomError';
import { IAuthenticator } from 'src/models/IAuthenticator';
import { IHashManager } from 'src/models/IHashManager';
import { IIdGenerator } from 'src/models/IIdGenerator';
import { CreatePlayerInputDTO } from 'src/dtos/playerDTOs';
import { PlayerRepository } from 'src/models/PlayerRepository';

@Injectable()
export class PlayerService {
  constructor(
    private playerDatabase: PlayerRepository,
    private hashManager: IHashManager,
    private authenticator: IAuthenticator,
    private idGenerator: IIdGenerator,
  ) {}

  async createPlayer(player: CreatePlayerInputDTO): Promise<string> {
    try {
      const id: string = await this.idGenerator.generate();
      const password = await this.hashManager.hashGenerator(player.password);

      await this.playerDatabase.createPlayer({
        id: id,
        password: password,
        name: player.name,
        email: player.email,
      });

      const token = this.authenticator.generateToken({ id: id });
      return token;

    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  }
}
