import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Book } from 'src/core/typeorm/entities/book.entity';
import { BookRepository } from '../data/books.repository';
import { CreateBookDto } from '../dtos/create-book.dto';
import { FindBookDto } from '../dtos/find-book.dto';
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

  async findAll(query: FindBookDto): Promise<Book[] | BadRequestException> {
    return await this.bookRepository.findAll(query);
  }

  async findOne(id: string): Promise<Book | BadRequestException> {
    const find = await this.bookRepository.findOne(id);
    if (!find) throw new BadRequestException(BookErrorEnum.BOOK_NOT_FOUND);
    return find;
  }

  async findStock(): Promise<Book[] | BadRequestException> {
    const stock = await this.bookRepository.findStock();
    if (!stock) throw new BadRequestException(BookErrorEnum.BOOKS_NOT_FOUND);
    return stock;
  }

  async update(
    id: string,
    payload: UpdateBookDto,
  ): Promise<Book | BadRequestException> {
    const bookExists = await this.bookRepository.findOneByName(payload.name);
    const book = await this.bookRepository.findOne(id);
    if (book) {
      if (bookExists && book.id !== bookExists.id)
        throw new BadRequestException(BookErrorEnum.BOOK_ALREADY_EXISTS);
      book.name = payload.name ? payload.name : book.name;
      book.resume = payload.resume ? payload.resume : book.resume;
      book.author = payload.author ? payload.author : book.author;
      book.publisher = payload.publisher ? payload.publisher : book.publisher;
      book.age_rating = payload.age_rating
        ? payload.age_rating
        : book.age_rating;
      book.year_publication = payload.year_publication
        ? payload.year_publication
        : book.year_publication;
      book.pages = payload.pages ? payload.pages : book.pages;
      if (Number(payload.stock) || Number(payload.stock) === 0)
        book.stock = payload.stock;
      book.value = payload.value ? payload.value : book.value;
    } else {
      throw new BadRequestException(BookErrorEnum.BOOK_NOT_FOUND);
    }
    return await this.bookRepository.update(book);
  }

  async remove(id: string): Promise<void | BadRequestException> {
    const find = await this.bookRepository.findOne(id);
    if (!find) throw new BadRequestException(BookErrorEnum.BOOK_NOT_FOUND);
    await this.bookRepository.remove(id);
  }
}
