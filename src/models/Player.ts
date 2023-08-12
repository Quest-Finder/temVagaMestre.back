/* eslint-disable prettier/prettier */
export default class Player {
  private id: string;
  private name: string;
  private email: string;
  private password: string;
  private gender?: string;
  private age?: number;
  private experience?: number;
  private photo?: string;
  private description?: string;
  private phone_number?: string;
  private instagram?: string;

  constructor(
    id: string,
    name: string,
    email: string,
    pass: string,
    gender?: string,
    age?: number,
    experience?: number,
    photo?: string,
    description?: string,
    phone_number?: string,
    instagram?: string,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = pass;
    this.gender = gender;
    this.age = age;
    this.experience = experience;
    this.photo = photo;
    this.description = description;
    this.phone_number = phone_number;
    this.instagram = instagram;
  }
}
