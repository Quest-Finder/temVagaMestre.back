/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';
import { PlayerEntity } from './PlayerEntity';

@Entity('rpg_character_player')
export class CharacterPlayerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  character_name: string;

  @Column()
  game_system: string;

  @Column()
  class: string;

  @Column()
  level: number;

  @Column()
  skills: string;

  @Column()
  equipment: string;

  @Column()
  other_details: string;

  @OneToOne(() => PlayerEntity)
  @JoinColumn({ name: 'player_id' })
  player: PlayerEntity;
}
