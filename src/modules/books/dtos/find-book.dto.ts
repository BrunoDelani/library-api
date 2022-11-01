import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';

export class FindBookDto extends PartialType(CreateBookDto) {}
