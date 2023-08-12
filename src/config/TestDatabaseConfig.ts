/* eslint-disable prettier/prettier */
import knex, { Knex } from "knex";
import { createTables } from "../migrations/migrations";
import { DatabaseConfig } from "../models/DatabaseConfig";

export class TestDatabaseConfig implements DatabaseConfig {
  public connection(): Knex {
    const knexConnection =  knex({
      client: 'sqlite3',
      connection: {
        filename: ':memory:',
      },
      useNullAsDefault: true,
    })

    createTables(knexConnection);
    return knexConnection
  };
}