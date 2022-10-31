import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { Category } from 'src/core/typeorm/entities/category.entity';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { FindCategoryDto } from '../dtos/find-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { CategoryErrorEnum } from '../errors/categories.error.enum';
import { CategoriesService } from '../services/categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Post()
  create(@Body() payload: CreateCategoryDto): Promise<Category | BadRequestException> {
    try {
      return this.categoriesService.create(payload);
    } catch (err) {
      if (err?.driverError?.sqlMessage) {
        throw new BadRequestException(err.driverError.sqlMessage);
      }
      throw new BadRequestException(CategoryErrorEnum.CATEGORY_ALREADY_EXISTS);
    }
  }

  @Get()
  findAll(@Query() query: FindCategoryDto): Promise<Category[] | BadRequestException> {
    try {
      return this.categoriesService.findAll(query);
    } catch (err) {
      if (err?.driverError?.sqlMessage) {
        throw new BadRequestException(err.driverError.sqlMessage);
      }
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Category|BadRequestException> {
    try {
      return this.categoriesService.findOne(id);
    } catch (err) {
      if (err?.driverError?.sqlMessage) {
        throw new BadRequestException(err.driverError.sqlMessage);
      }
      throw new BadRequestException(CategoryErrorEnum.CATEGORY_NOT_FOUND);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
