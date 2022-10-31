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

  async update(
    id: string,
    payload: UpdateCategoryDto,
  ): Promise<Category | BadRequestException> {
    const nameExists = await this.categoryRepository.findOneByName(
      payload.name,
    );
    const category = await this.categoryRepository.findOne(id);
    if (category) {
      category.name = payload.name ? payload.name : category.name;
    } else {
      throw new BadRequestException(CategoryErrorEnum.CATEGORY_NOT_FOUND);
    }
    if (nameExists && id != nameExists.id)
      throw new BadRequestException(CategoryErrorEnum.CATEGORY_ALREADY_EXISTS);
    return await this.categoryRepository.update(category);
  }

  async remove(id: string): Promise<void | BadRequestException> {
    const category = await this.categoryRepository.findOne(id);
    if (!category)
      throw new BadRequestException(CategoryErrorEnum.CATEGORY_NOT_FOUND);
    await this.categoryRepository.remove(id);
  }
}
