import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';

import uploadConfig from '../config/upload';

import Ad from './Ad';

@Entity('ad_files')
class File extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ad_id: string;

  @ManyToOne(() => Ad, ad => ad.files)
  ad: Ad;

  @Column()
  filename: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'file_url' })
  getFileUrl(): string | null {
    if (!this.filename) {
      return null;
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.API_URL}/files/${this.filename}`;
      default:
        return null;
    }
  }
}

export default File;
