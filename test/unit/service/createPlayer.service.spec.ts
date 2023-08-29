/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { CreatePlayerInputDTO } from '../../../src/dtos/playerDTOs';
import { IHashManager } from '../../../src/models/IHashManager';
import { IAuthenticator } from '../../../src/models/IAuthenticator';
import { IIdGenerator } from '../../../src/models/IIdGenerator';
import { PlayerService } from '../../../src/service/PlayerService';
import { PlayerRepository } from '../../../src/models/PlayerRepository';

const hashManagerMock = {
  hashGenerator: jest.fn(() => 'hashedPassword'),
};

const authenticatorMock = {
  generateToken: jest.fn(() => 'validToken'),
  getData: jest.fn(() => {
    return {id: 'validId'}
  }),
};

const idGeneratorMock = {
  generate: jest.fn(() => 'validId'),
};

const playerDatabaseMock = {
  createPlayer: jest.fn()
};

describe('CreatePlayerService', () => {
  let playerService: PlayerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
        imports: [],
        providers: [
          PlayerService,
          {
            provide: PlayerRepository,
            useValue: playerDatabaseMock,
          },
          {
            provide: IHashManager,
            useValue: hashManagerMock,
          },
          {
            provide: IAuthenticator,
            useValue: authenticatorMock,
          },
          {
            provide: IIdGenerator,
            useValue: idGeneratorMock,
          },
        ],
      }).compile();
  
      playerService = module.get<PlayerService>(PlayerService);
  });

  it("should be defined", () => {
    expect(playerService).toBeDefined()
  });

  it('should create a new player and return a token', async () => {
    const input: CreatePlayerInputDTO = {
      name: 'Test Player',
      email: 'test@example.com',
      password: 'testpassword',
    };

    const token = await playerService.createPlayer(input);
    expect(token).toBe("validToken");
  });
});