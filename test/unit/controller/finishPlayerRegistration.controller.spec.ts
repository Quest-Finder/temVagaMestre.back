/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ValidationPipe } from '@nestjs/common';
import { Response } from 'express';

import { PlayerService } from '../../../src/service/PlayerService';
import { PlayerController } from '../../../src/controller/PlayerController';

import { FinishPlayerRegistrationInputDTO } from '../../../src/dtos/playerDTOs';
import { GENDER } from '../../../src/models/Player';

const playerServiceMock = {
  finishPlayerRegistration: jest.fn().mockResolvedValue('The player registration has been completed successfully.'),
};

describe("finishPlayerRegistrationController", () => {
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

  it('should return a successful message', async () => {
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockResolvedValue('The player registration has been completed successfully.'),
    } as unknown as Response;
    
    const input: FinishPlayerRegistrationInputDTO = {
      gender: GENDER.FEM,
      age: 25,
      experience: 2,
      photo: "www.url-da-foto.com",
      description: "Descrição teste",
      phone_number: "51993365487",
      instagram: "www.instagram.com/usuario-teste"
    };
    
    const validationPipe = new ValidationPipe({
      transform: true, // Isso permite que o ValidationPipe transforme os dados no DTO
      whitelist: true, // Isso garante que apenas propriedades definidas no DTO sejam permitidas
    });
    
    const sendSpy = jest.spyOn(mockResponse, 'send');
    await validationPipe.transform(input, { type: 'body', metatype: FinishPlayerRegistrationInputDTO });
    await playerController.finishPlayerRegistration({token: 'validToken'}, input, mockResponse);
    expect(sendSpy).toHaveBeenCalledWith({ message: 'The player registration has been completed successfully.' });
  });
    
  it("should return a validation error because of the invalid age", async () => {
    mockResponse = {
      status: jest.fn().mockResolvedValue(400),
      send: jest.fn().mockResolvedValue("validation error"),
    } as unknown as Response;
    
    const input: FinishPlayerRegistrationInputDTO = {
      gender: GENDER.FEM,
      age: 16,
      experience: 2,
      photo: "www.url-da-foto.com",
      description: "Descrição teste",
      phone_number: "51993365487",
      instagram: "www.instagram.com/usuario-teste"
    };
    
    const validationPipe = new ValidationPipe({
      transform: true,
      whitelist: true,
    });
    
    try {
      await validationPipe.transform(input, { type: 'body', metatype: FinishPlayerRegistrationInputDTO });
      await playerController.finishPlayerRegistration({token: "validToken"}, input, mockResponse);
    } catch (err: any) {
      expect(err.response.message[0]).toBe("age must not be less than 18");
    }
  });
    
  it("should return a validation error because of the invalid experience", async () => {
    mockResponse = {
      status: jest.fn().mockResolvedValue(400),
      send: jest.fn().mockResolvedValue("validation error"),
    } as unknown as Response;
    
    const input: FinishPlayerRegistrationInputDTO = {
      gender: GENDER.FEM,
      age: 18,
      experience: 0,
      photo: "www.url-da-foto.com",
      description: "Descrição teste",
      phone_number: "51993365487",
      instagram: "www.instagram.com/usuario-teste"
    };
    
    const validationPipe = new ValidationPipe({
      transform: true,
      whitelist: true,
    });
    
    try {
      await validationPipe.transform(input, { type: 'body', metatype: FinishPlayerRegistrationInputDTO });
      await playerController.finishPlayerRegistration({token: "validToken"}, input, mockResponse);
    } catch (err: any) {
      expect(err.response.message[0]).toBe("experience must not be less than 1");
    }
  });
    
  it("should return a validation error because of the invalid photo url", async () => {
    mockResponse = {
      status: jest.fn().mockResolvedValue(400),
      send: jest.fn().mockResolvedValue("validation error"),
    } as unknown as Response;
    
    const input: FinishPlayerRegistrationInputDTO = {
      gender: GENDER.FEM,
      age: 18,
      experience: 2,
      photo: "url-da-foto",
      description: "Descrição teste",
      phone_number: "51993365487",
      instagram: "www.instagram.com/usuario-teste"
    };
    
    const validationPipe = new ValidationPipe({
      transform: true,
      whitelist: true,
    });
    
    try {
      await validationPipe.transform(input, { type: 'body', metatype: FinishPlayerRegistrationInputDTO });
      await playerController.finishPlayerRegistration({token: "validToken"}, input, mockResponse);
    } catch (err: any) {
      expect(err.response.message[0]).toBe("photo must be a URL address");
    }
  });
    
  it("should return a validation error because of the invalid description", async () => {
    mockResponse = {
      status: jest.fn().mockResolvedValue(400),
      send: jest.fn().mockResolvedValue("validation error"),
    } as unknown as Response;
    
    const input: FinishPlayerRegistrationInputDTO = {
      gender: GENDER.FEM,
      age: 18,
      experience: 2,
      photo: "www.url-da-foto.com",
      description: "",
      phone_number: "51993365487",
      instagram: "www.instagram.com/usuario-teste"
    };
    
    const validationPipe = new ValidationPipe({
      transform: true,
      whitelist: true,
    });
    
    try {
      await validationPipe.transform(input, { type: 'body', metatype: FinishPlayerRegistrationInputDTO });
      await playerController.finishPlayerRegistration({token: "validToken"}, input, mockResponse);
    } catch (err: any) {
      expect(err.response.message[0]).toBe("The description must be provided");
    }
  });
    
  it("should return a validation error because of the invalid phone number", async () => {
    mockResponse = {
      status: jest.fn().mockResolvedValue(400),
      send: jest.fn().mockResolvedValue("validation error"),
    } as unknown as Response;
    
    const input: FinishPlayerRegistrationInputDTO = {
      gender: GENDER.FEM,
      age: 18,
      experience: 2,
      photo: "www.url-da-foto.com",
      description: "descrição teste",
      phone_number: "5199336",
      instagram: "www.instagram.com/usuario-teste"
    };
    
    const validationPipe = new ValidationPipe({
      transform: true,
      whitelist: true,
    });
    
    try {
      await validationPipe.transform(input, { type: 'body', metatype: FinishPlayerRegistrationInputDTO });
      await playerController.finishPlayerRegistration({token: "validToken"}, input, mockResponse);
    } catch (err: any) {
      expect(err.response.message[0]).toBe("phone_number must be a valid phone number");
    }
  });
    
  it("should return a validation error because of the invalid instagram url", async () => {
    mockResponse = {
      status: jest.fn().mockResolvedValue(400),
      send: jest.fn().mockResolvedValue("validation error"),
    } as unknown as Response;
    
      const input: FinishPlayerRegistrationInputDTO = {
        gender: GENDER.FEM,
        age: 18,
        experience: 2,
        photo: "www.url-da-foto.com",
        description: "descrição teste",
        phone_number: "51995567896",
        instagram: "insta"
      };
    
      const validationPipe = new ValidationPipe({
        transform: true,
        whitelist: true,
      });
    
    try {
      await validationPipe.transform(input, { type: 'body', metatype: FinishPlayerRegistrationInputDTO });
      await playerController.finishPlayerRegistration({token: "validToken"}, input, mockResponse);
    } catch (err: any) {
      expect(err.response.message[0]).toBe("instagram must be a URL address");
    }
  });
});