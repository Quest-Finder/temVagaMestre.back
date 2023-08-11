/* eslint-disable prettier/prettier */
import * as dotenv from 'dotenv';
import { Injectable } from '@nestjs/common';
import knex from 'knex';

dotenv.config();

@Injectable()
export default abstract class BaseDatabase {
  protected static connection = knex({
    client: 'mysql',
    connection: {
      host: process.env.DB_HOST,
      port: 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_SCHEMA,
      multipleStatements: true,
    },
  });
}
