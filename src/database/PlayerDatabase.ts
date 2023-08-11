/* eslint-disable prettier/prettier */
import { PlayerRepository } from 'src/models/PlayerRepository';
import BaseDatabase from './BaseDatabase';
import { Injectable } from '@nestjs/common';
import { CreatePlayerDatabaseDTO } from 'src/dtos/playerDTOs';

@Injectable()
export class PlayerDatabase extends BaseDatabase implements PlayerRepository {
  TABLE_NAME = 'rpg_players';

  async createPlayer(player: CreatePlayerDatabaseDTO): Promise<void> {
    try {
      await BaseDatabase.connection
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
