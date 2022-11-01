import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsNumberString, Max, Validate } from 'class-validator';
import { CreateBookDto } from './create-book.dto';

export class FindBookDto extends PartialType(CreateBookDto) {
  @Validate(IsNumberString)
  @IsEnum([0, 10, 12, 14, 16, 18], {
    message: 'Use one of the valid age ratings: 0 | 10 | 12 | 14 | 16 | 18.',
  })
  age_rating: number;

  @Validate(IsNumberString)
  @Max(3000, { message: 'Invalid year.' })
  year_publication: number;

  @Validate(IsNumberString)
  stock: number;

  @Validate(IsNumberString)
  value: number;
}
