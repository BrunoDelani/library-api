import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Book } from 'src/core/typeorm/entities/book.entity';
import { CreateBookDto } from '../dtos/create-book.dto';
import { FindBookDto } from '../dtos/find-book.dto';
import { UpdateBookDto } from '../dtos/update-book.dto';
import { BookErrorEnum } from '../errors/books.error.enum';
import { BooksService } from '../services/books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(
    @Body() createBookDto: CreateBookDto,
  ): Promise<Book | BadRequestException> {
    try {
      return this.booksService.create(createBookDto);
    } catch (err) {
      if (err?.driverError?.sqlMessage) {
        throw new BadRequestException(err.driverError.sqlMessage);
      }
      throw new BadRequestException(BookErrorEnum.BOOK_ALREADY_EXISTS);
    }
  }

  @Get()
  findAll(@Query() query: FindBookDto): Promise<Book[] | BadRequestException> {
    try {
      return this.booksService.findAll(query);
    } catch (err) {
      if (err?.driverError?.sqlMessage) {
        throw new BadRequestException(err.driverError.sqlMessage);
      }
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Book | BadRequestException> {
    try {
      return this.booksService.findOne(id);
    } catch (err) {
      if (err?.driverError?.sqlMessage) {
        throw new BadRequestException(err.driverError.sqlMessage);
      }
      throw new BadRequestException(BookErrorEnum.BOOK_NOT_FOUND);
    }
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<Book | BadRequestException> {
    try {
      return this.booksService.update(id, updateBookDto);
    } catch (err) {
      if (err?.driverError?.sqlMessage) {
        throw new BadRequestException(err.driverError.sqlMessage);
      }
      throw new BadRequestException(BookErrorEnum.BOOK_NOT_FOUND);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string): Promise<void | BadRequestException> {
    try {
      return this.booksService.remove(id);
    } catch (err) {
      if (err?.driverError?.sqlMessage) {
        throw new BadRequestException(err.driverError.sqlMessage);
      }
      throw new BadRequestException(BookErrorEnum.BOOK_NOT_FOUND);
    }
  }
}
