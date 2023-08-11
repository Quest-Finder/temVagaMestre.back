/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreatePlayerDatabaseDTO {
  id: string;
  name: string;
  email: string;
  password: string;
}

export class CreatePlayerInputDTO {
  @IsNotEmpty({message: "The player name must be provided"})
  @IsString({message: "The player name must be a string"})
  @Length(5, 100)
  name: string;

  @IsNotEmpty({message: "The player's email must be provided"})
  @IsString({message: "The player's email must be a string"})
  @Length(10, 180)
  email: string;

  @IsNotEmpty({message: "The player's password must be provided"})
  @IsString({message: "The player's password must be a string"})
  @Length(8, 255)
  password: string;
}
