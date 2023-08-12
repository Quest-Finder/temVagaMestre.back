/* eslint-disable prettier/prettier */
import * as dotenv from 'dotenv';
import knex from 'knex';
import { DatabaseConfig } from 'src/models/DatabaseConfig';

dotenv.config();

export class ProdDatabaseConfig implements DatabaseConfig {
  public connection(): any {
    return knex({
      client: 'mysql',
      connection: {
        host: process.env.DB_HOST,
        port: 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_SCHEMA,
        multipleStatements: true,
      }
    })
  };
}
