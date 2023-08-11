/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';
import { MasterStyleEntity } from './MasterStyleEntity';

@Entity('rpg_table')
export class TableEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  table_name: string;

  @Column()
  date: Date;

  @Column()
  time: string;

  @Column()
  campaign_theme: string;

  @Column()
  campaign_theme_description: string;

  @OneToOne(() => MasterStyleEntity)
  @JoinColumn({ name: 'master_style_id' })
  masterStyle: MasterStyleEntity;
}
