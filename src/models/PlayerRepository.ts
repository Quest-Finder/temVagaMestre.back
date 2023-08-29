/* eslint-disable prettier/prettier */
import { FinishPlayerRegistrationInputDTO } from 'src/dtos/playerDTOs';
import Player from './Player';

export abstract class PlayerRepository {
  abstract createPlayer(player: Player): Promise<void>;
  abstract finishPlayerRegistration(playerId: string, player: FinishPlayerRegistrationInputDTO): Promise<void>;
}
