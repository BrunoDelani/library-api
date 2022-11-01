import { BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/core/typeorm/entities/book.entity';
import { Like, MoreThan, Repository } from 'typeorm';
import { CreateBookDto } from '../dtos/create-book.dto';
import { FindBookDto } from '../dtos/find-book.dto';
import { BookRepository } from './books.repository';

export class BookTypeOrmRepository implements BookRepository {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}
  create(payload: CreateBookDto): Promise<Book> {
    return this.bookRepository.save(payload);
  }
  async findAll(query: FindBookDto): Promise<Book[]> {
    const {
      name,
      author,
      publisher,
      age_rating,
      year_publication,
      stock,
      value,
    } = query;
    const books = await this.bookRepository.find({
      where: {
        name: name ? Like(`%${name}%`) : Like('%%'),
        author: author ? Like(`%${author}%`) : Like('%%'),
        publisher: publisher ? Like(`%${publisher}%`) : Like('%%'),
        age_rating: age_rating ? age_rating : MoreThan(0),
        year_publication: year_publication ? year_publication : MoreThan(0),
        stock: stock ? stock : MoreThan(0),
        value: value ? value : MoreThan(0),
      },
    });
    return books;
  }
  findOne(id: string): Promise<Book> {
    throw new Error('Method not implemented.');
  }
  findOneByName(name: string): Promise<Book | null> {
    return this.bookRepository.findOne({ where: { name } });
  }
  update(payload: Book): Promise<Book | BadRequestException> {
    throw new Error('Method not implemented.');
  }
  remove(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
