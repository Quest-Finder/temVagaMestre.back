/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { CreatePlayerInputDTO } from '../../src/dtos/playerDTOs';
import { PlayerService } from '../../src/service/PlayerService';
import { PlayerController } from '../../src/controller/PlayerController';
import { Response } from 'express';

const playerServiceMock = {
    createPlayer: jest.fn().mockResolvedValue("validToken"),
};

describe('PlayerController', () => {
  let playerController: PlayerController;
  let playerService: PlayerService;
  let mockResponse: Response;

  beforeEach(async () => {
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockResolvedValue("validToken"),
    } as unknown as Response;

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

  it("should be defined", () => {
    expect(playerController).toBeDefined()
    expect(playerService).toBeDefined()
  })

  describe('createPlayer', () => {
    it('should return a token', async () => {
      const input: CreatePlayerInputDTO = {
        name: 'Test Player',
        email: 'test@example.com',
        password: 'testpassword',
      };

      const sendSpy = jest.spyOn(mockResponse, 'send');
      await playerController.createPlayer(input, mockResponse);
      expect(sendSpy).toHaveBeenCalledWith({ token: 'validToken' });
    });
  });
});