/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { FinishPlayerRegistrationInputDTO } from '../../../src/dtos/playerDTOs';
import { IHashManager } from '../../../src/models/IHashManager';
import { IAuthenticator } from '../../../src/models/IAuthenticator';
import { IIdGenerator } from '../../../src/models/IIdGenerator';
import { PlayerService } from '../../../src/service/PlayerService';
import { PlayerRepository } from '../../../src/models/PlayerRepository';
import { GENDER } from '../../../src/models/Player';

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
  finishPlayerRegistration: jest.fn()
};

describe('FinishPlayerRegistrationService', () => {
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

  it('should update the player information', async () => {
    const input: FinishPlayerRegistrationInputDTO = {
      gender: GENDER.FEM,
      age: 18,
      experience: 2,
      photo: "www.url-da-foto.com",
      description: "descrição teste",
      phone_number: "51993366987",
      instagram: "www.instagram.com/usuario-teste"
    };

    await playerService.finishPlayerRegistration("validToken", input);
  });

  it('should return a validation error', async () => {
    const input: FinishPlayerRegistrationInputDTO = {
      gender: GENDER.FEM,
      age: 18,
      experience: 2,
      photo: "www.url-da-foto.com",
      description: "descrição teste",
      phone_number: "51993366987",
      instagram: "www.insta.com/usuario-teste"
    };

    await expect(async () => {
      await playerService.finishPlayerRegistration("validToken", input);
    }).rejects.toThrowError("Invalid instagram url.");
  });
});