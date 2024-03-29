/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CustomError } from '../errors/CustomError';
import { IAuthenticator } from '../models/IAuthenticator';
import { IHashManager } from '../models/IHashManager';
import { IIdGenerator } from '../models/IIdGenerator';
import { CreatePlayerInputDTO } from '../dtos/playerDTOs';
import { PlayerRepository } from '../models/PlayerRepository';
import Player from '../models/Player';

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
      const newPlayer = new Player(id, player.name, player.email, password)
      
      await this.playerDatabase.createPlayer(newPlayer);

      const token = this.authenticator.generateToken({ id: id });
      return token;

    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  }
}
