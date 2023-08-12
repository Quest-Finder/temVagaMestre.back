/* eslint-disable prettier/prettier */
import Player from './Player';

export abstract class PlayerRepository {
  abstract createPlayer(player: Player): Promise<void>;
}
