import { BadRequestException } from '@nestjs/common';
import { Category } from 'src/core/typeorm/entities/category.entity';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { FindCategoryDto } from '../dtos/find-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';

export interface CategoryRepository {
  create(payload: CreateCategoryDto): Promise<Category>;
  findAll(query: FindCategoryDto): Promise<Category[]>;
  findOne(id: string): Promise<Category | null>;
  findOneByName(name: string): Promise<Category | null>;
  update(payload: Category): Promise<Category | BadRequestException>;
  remove(id: number): Promise<void>;
}
