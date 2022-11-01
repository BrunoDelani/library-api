import { BadRequestException } from '@nestjs/common';
import { Book } from 'src/core/typeorm/entities/book.entity';
import { CreateBookDto } from '../dtos/create-book.dto';
import { FindBookDto } from '../dtos/find-book.dto';
import { UpdateBookDto } from '../dtos/update-book.dto';

export interface BookRepository {
  create(payload: CreateBookDto): Promise<Book>;
  findAll(query: FindBookDto): Promise<Book[]>;
  findOne(id: string): Promise<Book | null>;
  findOneByName(name: string): Promise<Book | null>;
  update(payload: UpdateBookDto): Promise<Book | BadRequestException>;
  remove(id: string): Promise<void>;
}
