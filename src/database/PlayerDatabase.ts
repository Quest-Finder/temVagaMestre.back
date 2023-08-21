/* eslint-disable prettier/prettier */
import { PlayerRepository } from '../models/PlayerRepository';
import { Injectable } from '@nestjs/common';
import { DatabaseConfig } from '../models/DatabaseConfig';
import Player from '../models/Player';
import { CustomError } from 'src/errors/CustomError';
import { FinishPlayerRegistrationInputDTO } from 'src/dtos/playerDTOs';

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
      throw new CustomError(error.statusCode, error.message);
    } finally {
      this.databaseConfig.connection().destroy();
    }
  }

  async finishPlayerRegistration(playerId: string, input: FinishPlayerRegistrationInputDTO): Promise<void> {
    try {
      await this.databaseConfig.connection()(this.TABLE_NAME)
        .where("id", playerId)
        .update({
          gender: input.gender,
          age: input.age,
          experience: input.experience,
          photo: input.photo,
          description: input.description,
          phone_number: input.phone_number,
          instagram: input.instagram
        });
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    } finally {
      this.databaseConfig.connection().destroy();
    }
  }
}
