/* eslint-disable prettier/prettier */
import { IsEmail, IsEnum, IsJWT, IsNotEmpty, IsNumber, IsPhoneNumber, IsString, IsUrl, Length, Min } from "class-validator";
import { GENDER } from "src/models/Player";

export class CreatePlayerInputDTO {
  @IsNotEmpty({message: "The player name must be provided"})
  @IsString({message: "The player name must be a string"})
  @Length(5, 100)
  name: string;

  @IsNotEmpty({message: "The player's email must be provided"})
  @Length(10, 180)
  @IsEmail()
  email: string;

  @IsNotEmpty({message: "The player's password must be provided"})
  @IsString({message: "The player's password must be a string"})
  @Length(8, 255)
  password: string;
}

export class FinishPlayerRegistrationInputDTO {
  @IsNotEmpty({message: "The gender must be provided"})
  @IsEnum(GENDER, {message: "Invalid gender - gender must be FEM, MASC or NA"})
  gender: GENDER;
  
  @IsNotEmpty({message: "The age must be provided"})
  @IsNumber()
  @Min(18)
  age: number;

  @IsNotEmpty({message: "The experience must be provided"})
  @IsNumber()
  experience: number;

  @IsNotEmpty({message: "The photo url must be provided"})
  @IsString()
  @IsUrl()
  photo: string;

  @IsNotEmpty({message: "The description must be provided"})
  @IsString()
  description: string;

  @IsNotEmpty({message: "The phone number must be provided"})
  @IsString()
  @IsPhoneNumber("BR")
  phone_number: string;

  @IsNotEmpty({message: "The instagram url must be provided"})
  @IsString()
  @IsUrl()
  instagram: string;
}

export class TokenInputDTO {
  @IsNotEmpty({message: "The token must be provided"})
  @IsJWT()
  token: string;
}
