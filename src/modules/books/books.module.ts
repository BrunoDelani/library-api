import { Module } from '@nestjs/common';
import { BooksService } from './services/books.service';
import { BooksController } from './controllers/books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from 'src/core/typeorm/entities/book.entity';
import { BookTypeOrmRepository } from './data/books.typeorm.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  controllers: [BooksController],
  providers: [
    BooksService,
    {
      provide: 'bookRepository',
      useClass: BookTypeOrmRepository,
    },
  ],
})
export class BooksModule {}
