/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('rpg_players')
export class PlayerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  gender: string;

  @Column()
  age: number;

  @Column()
  experience: number;

  @Column()
  photo: string;

  @Column()
  description: string;

  @Column()
  phone_number: string;

  @Column()
  instagram: string;
}