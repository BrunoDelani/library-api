import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 60, nullable: false, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 500, nullable: false })
  resume: string;

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];

  @Column({ type: 'varchar', length: 60, nullable: false })
  author: string;

  @Column({ type: 'varchar', length: 60, nullable: false })
  publisher: string;

  @Column({ type: 'tinyint', nullable: false })
  age_rating: number;

  @Column({ type: 'year', nullable: false })
  year_publication: number;

  @Column({ type: 'smallint', nullable: false })
  pages: number;

  @Column({ type: 'smallint', nullable: false })
  stock: number;

  @Column({ type: 'decimal', precision: 6, scale: 2, nullable: false })
  value: number;

  @Column({ type: 'varchar', nullable: false, unique: true })
  image_path: string;
}
