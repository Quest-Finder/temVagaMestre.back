/* eslint-disable prettier/prettier */
import knex, { Knex } from "knex";
import { createTables } from "../migrations/migrations";

export class TestDatabaseConfig {
  private connectionInstance: Knex | null;

  public connection(): Knex {
    if (!this.connectionInstance) {
      const knexConnection =  knex({
        client: 'sqlite3',
        connection: {
          filename: ':memory:',
        },
        useNullAsDefault: true,
      })

      createTables(knexConnection);
      this.connectionInstance = knexConnection;
    }

    return this.connectionInstance
  };
}