/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { TableEntity } from './TableEntity';
import { CharacterPlayerEntity } from './CharacterPlayerEntity';

@Entity('rpg_table_participants')
export class TableParticipantsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => TableEntity)
  @JoinColumn({ name: 'rpg_table_id' })
  table: TableEntity;

  @ManyToOne(() => CharacterPlayerEntity)
  @JoinColumn({ name: 'character_id' })
  character: CharacterPlayerEntity;
}
