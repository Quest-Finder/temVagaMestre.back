/* eslint-disable prettier/prettier */
import { Knex } from "knex";

export abstract class DatabaseConfig {
    [x: string]: any;
    abstract connection(): Knex;
}