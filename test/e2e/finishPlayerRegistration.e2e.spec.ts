/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import * as request from 'supertest';
import { FinishPlayerRegistrationInputDTO } from '../../src/dtos/playerDTOs';
import { GENDER } from '../../src/models/Player';
import { token } from './createPlayer.e2e.spec';

describe('FinishPlayerRegistrationController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should update the player information', async () => {
    const input: FinishPlayerRegistrationInputDTO = {
      gender: GENDER.FEM,
      age: 18,
      experience: 2,
      photo: "www.url-da-foto.com",
      description: "description",
      phone_number: "51993365487",
      instagram: "www.instagram.com/usuario-teste"
    }

    const validationPipe = new ValidationPipe({
      transform: true,
      whitelist: true,
    });

    await validationPipe.transform(input, { type: 'body', metatype: FinishPlayerRegistrationInputDTO });

    const response = await request(app.getHttpServer())
      .patch('/players/finish-registration')
      .send(input)
      .set('Authorization', token)
      .expect(200)

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('The player registration has been completed successfully.');
  });

  it('should return an error because of the invalid age', async () => {
    const input: FinishPlayerRegistrationInputDTO = {
      gender: GENDER.FEM,
      age: 16,
      experience: 2,
      photo: "www.url-da-foto.com",
      description: "description",
      phone_number: "51993365487",
      instagram: "www.instagram.com/usuario-teste"
    }

    const validationPipe = new ValidationPipe({
      transform: true,
      whitelist: true,
    });

    try {
      await validationPipe.transform(input, { type: 'body', metatype: FinishPlayerRegistrationInputDTO });
      await request(app.getHttpServer())
        .patch('/players/finish-registration')
        .send(input)
        .set('Authorization', token)
        .expect(400)
    } catch (error) {
      expect(error.getResponse().statusCode).toBe(400);
      expect(error.getResponse().message[0]).toBe("age must not be less than 18");
    }
  });

  it('should return an error because of the invalid photo url', async () => {
    const input: FinishPlayerRegistrationInputDTO = {
      gender: GENDER.FEM,
      age: 18,
      experience: 2,
      photo: "invalid-url",
      description: "description",
      phone_number: "51993365487",
      instagram: "www.instagram.com/usuario-teste"
    }

    const validationPipe = new ValidationPipe({
      transform: true,
      whitelist: true,
    });

    try {
      await validationPipe.transform(input, { type: 'body', metatype: FinishPlayerRegistrationInputDTO });
      await request(app.getHttpServer())
        .patch('/players/finish-registration')
        .send(input)
        .set('Authorization', token)
        .expect(400)
    } catch (error) {
      expect(error.getResponse().statusCode).toBe(400);
      expect(error.getResponse().message[0]).toBe("photo must be a URL address");
    }
  });

  it('should return an error because of the invalid description', async () => {
    const input: FinishPlayerRegistrationInputDTO = {
      gender: GENDER.FEM,
      age: 18,
      experience: 2,
      photo: "www.valid-url.com",
      description: "",
      phone_number: "51993365487",
      instagram: "www.instagram.com/usuario-teste"
    }

    const validationPipe = new ValidationPipe({
      transform: true,
      whitelist: true,
    });

    try {
      await validationPipe.transform(input, { type: 'body', metatype: FinishPlayerRegistrationInputDTO });
      await request(app.getHttpServer())
        .patch('/players/finish-registration')
        .send(input)
        .set('Authorization', token)
        .expect(400)
    } catch (error) {
      expect(error.getResponse().statusCode).toBe(400);
      expect(error.getResponse().message[0]).toBe("The description must be provided");
    }
  });

  it('should return an error because of the invalid phone number', async () => {
    const input: FinishPlayerRegistrationInputDTO = {
      gender: GENDER.FEM,
      age: 18,
      experience: 2,
      photo: "www.valid-url.com",
      description: "description",
      phone_number: "5199336",
      instagram: "www.instagram.com/usuario-teste"
    }

    const validationPipe = new ValidationPipe({
      transform: true,
      whitelist: true,
    });

    try {
      await validationPipe.transform(input, { type: 'body', metatype: FinishPlayerRegistrationInputDTO });
      await request(app.getHttpServer())
        .patch('/players/finish-registration')
        .send(input)
        .set('Authorization', token)
        .expect(400)
    } catch (error) {
      expect(error.getResponse().statusCode).toBe(400);
      expect(error.getResponse().message[0]).toBe("phone_number must be a valid phone number");
    }
  });

  it('should return an error because of the invalid instagram url', async () => {
    const input: FinishPlayerRegistrationInputDTO = {
      gender: GENDER.FEM,
      age: 18,
      experience: 2,
      photo: "www.valid-url.com",
      description: "description",
      phone_number: "51995663214",
      instagram: "usuario-teste"
    }

    const validationPipe = new ValidationPipe({
      transform: true,
      whitelist: true,
    });

    try {
      await validationPipe.transform(input, { type: 'body', metatype: FinishPlayerRegistrationInputDTO });
      await request(app.getHttpServer())
        .patch('/players/finish-registration')
        .send(input)
        .set('Authorization', token)
        .expect(400)
    } catch (error) {
      expect(error.getResponse().statusCode).toBe(400);
      expect(error.getResponse().message[0]).toBe("instagram must be a URL address");
    }
  });
});