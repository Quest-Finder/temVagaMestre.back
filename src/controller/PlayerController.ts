/* eslint-disable prettier/prettier */
import { Body, Headers, Controller, Post, Patch, Res } from '@nestjs/common';
import { CreatePlayerInputDTO, FinishPlayerRegistrationInputDTO, TokenInputDTO } from '../dtos/playerDTOs';
import { Response } from 'express';
import { PlayerService } from '../service/PlayerService';

@Controller('players')
export class PlayerController {
  constructor(private playerService: PlayerService) {}

  @Post('signup')
  async createPlayer(
    @Body() input: CreatePlayerInputDTO,
    @Res() res: Response,
  ) {
    try {
      const token = await this.playerService.createPlayer(input);
      res.status(201).send({ token });
    } catch (error: any) {
      res
        .status(error.statusCode || 400)
        .send(error.message || error.sqlMessage);
    }
  }

  @Patch('finish-registration')
  async finishPlayerRegistration(
    @Headers("Authorization") token: TokenInputDTO,
    @Body() input: FinishPlayerRegistrationInputDTO,
    @Res() res: Response,
  ) {
    try {
      await this.playerService.finishPlayerRegistration(token.toString(), input);
      res.status(200).send({message: "The player registration has been completed successfully."});
    } catch (error: any) {
      res
        .status(error.statusCode || 400)
        .send(error.message || error.sqlMessage);
    }
  }
}
