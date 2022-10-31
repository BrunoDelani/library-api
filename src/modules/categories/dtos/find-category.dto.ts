import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, MinLength } from 'class-validator';
import { CreateCategoryDto } from './create-category.dto';

export class FindCategoryDto extends PartialType(CreateCategoryDto) {
  @IsOptional()
  @MinLength(0, {})
  name?: string;
}
