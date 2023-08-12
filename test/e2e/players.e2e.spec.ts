/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import * as request from 'supertest';
import { CreatePlayerInputDTO } from '../../src/dtos/playerDTOs';

describe('PlayerController (e2e)', () => {
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

  it('should create a new player and return a valid token', async () => {
    const input: CreatePlayerInputDTO = {
      name: 'Test Player',
      email: 'test@example.com',
      password: 'testpassword',
    }

    const validationPipe = new ValidationPipe({
      transform: true, // Isso permite que o ValidationPipe transforme os dados no DTO
      whitelist: true, // Isso garante que apenas propriedades definidas no DTO sejam permitidas
    });

    await validationPipe.transform(input, { type: 'body', metatype: CreatePlayerInputDTO });

    const response = await request(app.getHttpServer())
      .post('/players/signup')
      .send(input)
      .expect(201)

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
  });

  it('should return an error because of the invalid email', async () => {
    const input: CreatePlayerInputDTO = {
      name: 'Test Player',
      email: 'testexample.com',
      password: 'testpassword',
    }

    const validationPipe = new ValidationPipe({
      transform: true,
      whitelist: true,
    });
  
    try {
      await validationPipe.transform(input, { type: 'body', metatype: CreatePlayerInputDTO });
      await request(app.getHttpServer())
        .post('/players/signup')
        .send(input)
        .expect(400)
    } catch (error) {
      expect(error.getResponse().statusCode).toBe(400);
    }
  });

  it('should return an error because of the invalid password length', async () => {
    const input: CreatePlayerInputDTO = {
      name: 'Test Player',
      email: 'test@example.com',
      password: 'test',
    }

    const validationPipe = new ValidationPipe({
      transform: true,
      whitelist: true,
    });
  
    try {
      await validationPipe.transform(input, { type: 'body', metatype: CreatePlayerInputDTO });
      await request(app.getHttpServer())
        .post('/players/signup')
        .send(input)
        .expect(400)
    } catch (error) {
      expect(error.getResponse().statusCode).toBe(400);
    }
  });

  it('should return an error because of the invalid name length', async () => {
    const input: CreatePlayerInputDTO = {
      name: 'Test',
      email: 'test@example.com',
      password: 'test12345678',
    }

    const validationPipe = new ValidationPipe({
      transform: true,
      whitelist: true,
    });
  
    try {
      await validationPipe.transform(input, { type: 'body', metatype: CreatePlayerInputDTO });
      await request(app.getHttpServer())
        .post('/players/signup')
        .send(input)
        .expect(400)
    } catch (error) {
      expect(error.getResponse().statusCode).toBe(400);
    }
  });
});
