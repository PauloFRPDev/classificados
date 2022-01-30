import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import Ad from './Ad';
import JurisdictedCategory from './JurisdictedCategory';

@Entity('jurisdicted')
class Jurisdicted extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Exclude()
  @Column()
  cpf: string;

  @OneToMany(() => Ad, ad => ad.jurisdicted)
  @JoinColumn()
  ads: Ad[];

  @Column()
  name: string;

  @Column()
  category_id: number;

  @ManyToOne(() => JurisdictedCategory)
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  category: JurisdictedCategory;

  @Column()
  registration_number: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Jurisdicted;
