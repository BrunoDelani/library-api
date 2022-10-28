import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CategoryRepository } from '../data/categories.repository';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { CategoryErrorEnum } from '../errors/categories.error.enum';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject('categoryRepository') private categoryRepository: CategoryRepository,
  ) { }

  async create(payload: CreateCategoryDto) {
    if (await this.categoryRepository.findOneByName(payload.name)){
      throw new BadRequestException(CategoryErrorEnum.CATEGORY_ALREADY_EXISTS);
    }
    return await this.categoryRepository.create(payload);
  }

  findAll() {
    return `This action returns all categories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
