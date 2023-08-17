/* eslint-disable prettier/prettier */
import { PlayerRepository } from '../models/PlayerRepository';
import { Injectable } from '@nestjs/common';
import { DatabaseConfig } from '../models/DatabaseConfig';
import Player from '../models/Player';

@Injectable()
export class PlayerDatabase implements PlayerRepository {
  constructor(private databaseConfig: DatabaseConfig) {}
  TABLE_NAME = 'rpg_players';

  async createPlayer(player: Player): Promise<void> {
    try {
      await this.databaseConfig.connection()
        .insert(player)
        .into(this.TABLE_NAME);
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    } finally {
      this.databaseConfig.connection().destroy()
    }
  }
}
