import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateBookDto } from '../dtos/create-book.dto';
import { UpdateBookDto } from '../dtos/update-book.dto';
import { BookErrorEnum } from '../errors/books.error.enum';
import { BooksService } from '../services/books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
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
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}
