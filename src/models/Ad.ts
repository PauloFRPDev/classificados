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

import AdCategory from './AdCategory';
import City from './City';
import District from './District';
import File from './File';
import Jurisdicted from './Jurisdicted';

@Entity('ads')
class Ad extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  cpf: string;

  @ManyToOne(() => Jurisdicted, jurisdicted => jurisdicted.ads)
  @JoinColumn({ name: 'cpf', referencedColumnName: 'cpf' })
  jurisdicted: Jurisdicted;

  @Column()
  phone_number: string;

  @Column()
  email: string;

  @Column()
  category_id: number;

  @ManyToOne(() => AdCategory)
  @JoinColumn({ name: 'category_id' })
  category: AdCategory;

  @Column()
  city_id: number;

  @ManyToOne(() => City)
  @JoinColumn({ name: 'city_id' })
  city: City;

  @Column()
  district_id: number;

  @ManyToOne(() => District)
  @JoinColumn({ name: 'district_id' })
  district: District;

  @Column()
  description: string;

  @Column({ default: 0 })
  is_published: boolean;

  @Column({ nullable: true })
  publication_date: Date;

  @Column({ nullable: true })
  expiration_date: Date;

  @Column({ nullable: true })
  deleted_at: Date;

  @OneToMany(() => File, file => file.ad)
  files: File[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Ad;
