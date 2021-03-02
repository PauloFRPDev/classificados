import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Ad from './Ad';

@Entity('jurisdicted')
class Jurisdicted extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  cpf: string;

  @OneToMany(() => Ad, ad => ad.cpf)
  @JoinColumn({ name: 'cpf' })
  ads: Ad[];

  @Column()
  name: string;

  @Column()
  category_id: number;

  @Column()
  registration_number: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Jurisdicted;
