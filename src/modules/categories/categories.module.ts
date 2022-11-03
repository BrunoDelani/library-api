import { Module } from '@nestjs/common';
import { CategoriesService } from './services/categories.service';
import { CategoriesController } from './controllers/categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/core/typeorm/entities/category.entity';
import { CategoryTypeOrmRepository } from './data/categories.typeorm.repository';
import { Book } from 'src/core/typeorm/entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Book])],
  controllers: [CategoriesController],
  providers: [
    CategoriesService,
    {
      provide: 'categoryRepository',
      useClass: CategoryTypeOrmRepository,
    },
  ],
})
export class CategoriesModule {}
