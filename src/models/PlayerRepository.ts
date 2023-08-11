/* eslint-disable prettier/prettier */
import { CreatePlayerDatabaseDTO } from '../dtos/playerDTOs';

export abstract class PlayerRepository {
  abstract createPlayer(player: CreatePlayerDatabaseDTO): Promise<void>;
}
