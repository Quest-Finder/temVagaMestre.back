/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import * as request from 'supertest';

describe('PlayerController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/players/signup (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/players/signup')
      .send({
        name: 'Test Player',
        email: 'test@example.com',
        password: 'testpassword',
      })

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
  });

  afterAll(async () => {
    await app.close();
  });
});
