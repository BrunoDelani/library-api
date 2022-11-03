import { BadRequestException } from '@nestjs/common';
import { Book } from 'src/core/typeorm/entities/book.entity';
import { Category } from 'src/core/typeorm/entities/category.entity';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { FindCategoryDto } from '../dtos/find-category.dto';

export interface CategoryRepository {
  create(payload: CreateCategoryDto): Promise<Category>;
  findAll(query: FindCategoryDto): Promise<Category[]>;
  findOne(id: string): Promise<Category | null>;
  findOneByName(name: string): Promise<Category | null>;
  findCategoryInBook(id: string): Promise<Book | null>;
  update(payload: Category): Promise<Category | BadRequestException>;
  remove(id: string): Promise<void>;
}
