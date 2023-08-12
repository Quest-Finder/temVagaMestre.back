/* eslint-disable prettier/prettier */
import * as dotenv from 'dotenv';
import knex from 'knex';

dotenv.config();

export class ProdDatabaseConfig {
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
