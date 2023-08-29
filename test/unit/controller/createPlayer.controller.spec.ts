/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ValidationPipe } from '@nestjs/common';
import { Response } from 'express';

import { PlayerService } from '../../../src/service/PlayerService';
import { PlayerController } from '../../../src/controller/PlayerController';

import { CreatePlayerInputDTO } from '../../../src/dtos/playerDTOs';

const playerServiceMock = {
  createPlayer: jest.fn().mockResolvedValue('validToken')
};

describe('CreatePlayerController', () => {
  let playerController: PlayerController;
  let playerService: PlayerService;
  let mockResponse: Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
        imports: [],
        controllers:[PlayerController],
        providers: [
          {
            provide: PlayerService,
            useValue: playerServiceMock,
          }
        ],
      }).compile();
  
      playerController = module.get<PlayerController>(PlayerController);
      playerService = module.get<PlayerService>(PlayerService)
  });

  it('should be defined', () => {
    expect(playerController).toBeDefined()
    expect(playerService).toBeDefined()
  });

  it('should return a token', async () => {
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockResolvedValue("validToken"),
    } as unknown as Response;

    const input: CreatePlayerInputDTO = {
      name: 'Test Player',
      email: 'test@example.com',
      password: 'testpassword',
    };

    const validationPipe = new ValidationPipe({
      transform: true, // Isso permite que o ValidationPipe transforme os dados no DTO
      whitelist: true, // Isso garante que apenas propriedades definidas no DTO sejam permitidas
    });

    const sendSpy = jest.spyOn(mockResponse, 'send');
    await validationPipe.transform(input, { type: 'body', metatype: CreatePlayerInputDTO });
    await playerController.createPlayer(input, mockResponse);
    expect(sendSpy).toHaveBeenCalledWith({ token: 'validToken' });
  });

  it("should return a validation error because of the invalid email", async () => {
    mockResponse = {
      status: jest.fn().mockResolvedValue(400),
      send: jest.fn().mockResolvedValue("undefined"),
    } as unknown as Response;

    const input: CreatePlayerInputDTO = {
      name: 'Test Player',
      email: 'testexample.com',
      password: 'testpassword',
    };

    const validationPipe = new ValidationPipe({
      transform: true,
      whitelist: true,
    });

    try {
      await validationPipe.transform(input, { type: 'body', metatype: CreatePlayerInputDTO });
      await playerController.createPlayer(input, mockResponse);
    } catch (err: any) {
      expect(err.response.message[0]).toBe("email must be an email");
    }
  });

  it("should return a validation error because of the invalid password length", async () => {
    mockResponse = {
      status: jest.fn().mockResolvedValue(400),
      send: jest.fn().mockResolvedValue("undefined"),
    } as unknown as Response;

    const input: CreatePlayerInputDTO = {
      name: 'Test Player',
      email: 'test@example.com',
      password: 'test',
    };

    const validationPipe = new ValidationPipe({
      transform: true,
      whitelist: true,
    });

    try {
      await validationPipe.transform(input, { type: 'body', metatype: CreatePlayerInputDTO });
      await playerController.createPlayer(input, mockResponse);
    } catch (err: any) {
      expect(err.response.message[0]).toBe("password must be longer than or equal to 8 characters");
    }
  });
});