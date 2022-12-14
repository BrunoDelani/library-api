import { BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/core/typeorm/entities/book.entity';
import { Category } from 'src/core/typeorm/entities/category.entity';
import { In, LessThan, Like, MoreThan, Repository } from 'typeorm';
import { CreateBookDto } from '../dtos/create-book.dto';
import { FindBookDto } from '../dtos/find-book.dto';
import { UpdateBookDto } from '../dtos/update-book.dto';
import { BookRepository } from './books.repository';

export class BookTypeOrmRepository implements BookRepository {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
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
        age_rating: age_rating ? age_rating : MoreThan(-1),
        year_publication: year_publication ? year_publication : MoreThan(-1),
        stock: stock ? stock : MoreThan(-1),
        value: value ? value : MoreThan(-1),
      },
      select: {
        id: true,
        name: true,
        author: true,
        publisher: true,
        age_rating: true,
        year_publication: true,
        pages: true,
        stock: true,
        value: true,
      },
    });
    return books;
  }

  findOne(id: string): Promise<Book | null> {
    return this.bookRepository.findOne({ where: { id } });
  }

  findStock(): Promise<Book[] | null> {
    return this.bookRepository.find({
      where: {
        stock: LessThan(10),
      },
      select: {
        name: true,
        author: true,
        publisher: true,
        year_publication: true,
        stock: true,
        value: true,
      },
    });
  }

  findOneByName(name: string): Promise<Book | null> {
    return this.bookRepository.findOne({ where: { name } });
  }

  async findCategories(id: string): Promise<Category | null> {
    return this.categoryRepository.findOne({ where: { id } });
  }

  async findBookByCategories(categories: string[]): Promise<Book[] | null> {
    return this.bookRepository.findBy({
      categories: {
        name: In([categories]),
      },
    });
  }

  update(payload: UpdateBookDto): Promise<Book | BadRequestException> {
    return this.bookRepository.save(payload);
  }

  async remove(id: string): Promise<void> {
    this.bookRepository.delete(id);
  }
}
