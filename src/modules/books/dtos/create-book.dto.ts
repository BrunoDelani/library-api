import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @MaxLength(60, {
    message: 'Name book is too long.',
  })
  name: string;
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @MaxLength(500, {
    message: 'Resume is too long.',
  })
  resume: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @MaxLength(60, {
    message: 'Name author is too long.',
  })
  author: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @MaxLength(60, {
    message: 'Name publisher is too long.',
  })
  publisher: string;
  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  @IsEnum([0, 10, 12, 14, 16, 18], {
    message: 'Use one of the valid age ratings: 0 | 10 | 12 | 14 | 16 | 18.',
  })
  age_rating: number;
  @IsNumber()
  @IsPositive()
  @IsDefined()
  @IsNotEmpty()
  @Max(3000, { message: 'Invalid year.' })
  year_publication: number;
  @IsNumber()
  @IsPositive()
  @IsDefined()
  @IsNotEmpty()
  @Min(1, {
    message: 'Invalid pages.',
  })
  pages: number;
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  @IsPositive()
  stock: number;
  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  @IsPositive()
  value: number;
}
