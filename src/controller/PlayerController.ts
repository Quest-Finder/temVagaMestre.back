/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Res } from '@nestjs/common';
import { CreatePlayerInputDTO } from '../dtos/playerDTOs';
import { Response } from 'express';
import { PlayerService } from 'src/service/PlayerService';

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
}
