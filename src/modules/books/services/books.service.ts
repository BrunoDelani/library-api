import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Book } from 'src/core/typeorm/entities/book.entity';
import { BookRepository } from '../data/books.repository';
import { CreateBookDto } from '../dtos/create-book.dto';
import { UpdateBookDto } from '../dtos/update-book.dto';
import { BookErrorEnum } from '../errors/books.error.enum';

@Injectable()
export class BooksService {
  constructor(
    @Inject('bookRepository')
    private bookRepository: BookRepository,
  ) {}

  async create(payload: CreateBookDto): Promise<Book | BadRequestException> {
    if (await this.bookRepository.findOneByName(payload.name)) {
      throw new BadRequestException(BookErrorEnum.BOOK_ALREADY_EXISTS);
    }
    return await this.bookRepository.create(payload);
  }

  findAll() {
    return `This action returns all books`;
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
