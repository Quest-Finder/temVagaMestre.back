/* eslint-disable prettier/prettier */
import { PlayerRepository } from '../models/PlayerRepository';
import { Injectable } from '@nestjs/common';
import { CreatePlayerDatabaseDTO } from '../dtos/playerDTOs';
import { DatabaseConfig } from '../models/DatabaseConfig';

@Injectable()
export class PlayerDatabase implements PlayerRepository {
  constructor(private databaseConfig: DatabaseConfig) {}
  TABLE_NAME = 'rpg_players';

  async createPlayer(player: CreatePlayerDatabaseDTO): Promise<void> {
    try {
      await this.databaseConfig.connection()
        .insert({
          id: player.id,
          name: player.name,
          email: player.email,
          password: player.password,
        })
        .into(this.TABLE_NAME);
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
