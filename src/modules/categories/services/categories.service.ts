import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Category } from 'src/core/typeorm/entities/category.entity';
import { CategoryRepository } from '../data/categories.repository';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { FindCategoryDto } from '../dtos/find-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { CategoryErrorEnum } from '../errors/categories.error.enum';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject('categoryRepository')
    private categoryRepository: CategoryRepository,
  ) {}

  async create(
    payload: CreateCategoryDto,
  ): Promise<Category | BadRequestException> {
    if (await this.categoryRepository.findOneByName(payload.name)) {
      throw new BadRequestException(CategoryErrorEnum.CATEGORY_ALREADY_EXISTS);
    }
    return await this.categoryRepository.create(payload);
  }

  async findAll(
    query: FindCategoryDto,
  ): Promise<Category[] | BadRequestException> {
    return await this.categoryRepository.findAll(query);
  }

  async findOne(id: string): Promise<Category | BadRequestException> {
    const find = await this.categoryRepository.findOne(id);
    if (!find)
      throw new BadRequestException(CategoryErrorEnum.CATEGORY_NOT_FOUND);
    return find;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
