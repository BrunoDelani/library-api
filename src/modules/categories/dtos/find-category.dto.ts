import { PartialType } from '@nestjs/mapped-types';
import { IsEmpty, IsOptional } from 'class-validator';
import { CreateCategoryDto } from './create-category.dto';

export class FindCategoryDto extends PartialType(CreateCategoryDto) {
    @IsOptional()
    @IsEmpty()
    name?: string;
 }
