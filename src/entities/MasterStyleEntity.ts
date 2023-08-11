/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';
import { PlayerEntity } from './PlayerEntity';

@Entity('rpg_master_style')
export class MasterStyleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  style_name: string;

  @Column()
  style_description: string;

  @OneToOne(() => PlayerEntity)
  @JoinColumn({ name: 'master_id' })
  master: PlayerEntity;
}
