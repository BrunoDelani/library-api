import { BadRequestException } from '@nestjs/common';
import { Book } from 'src/core/typeorm/entities/book.entity';
import { FindCategoryDto } from 'src/modules/categories/dtos/find-category.dto';
import { CreateBookDto } from '../dtos/create-book.dto';

export interface BookRepository {
  create(payload: CreateBookDto): Promise<Book>;
  findAll(query: FindCategoryDto): Promise<Book[]>;
  findOne(id: string): Promise<Book | null>;
  findOneByName(name: string): Promise<Book | null>;
  update(payload: Book): Promise<Book | BadRequestException>;
  remove(id: string): Promise<void>;
}
