import { PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { CreateCategoryDto } from './create-category.dto';

export class FindCategoryDto extends PartialType(CreateCategoryDto) {
    @IsOptional()
    name: string;
}
