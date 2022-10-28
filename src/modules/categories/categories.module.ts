import { Module } from '@nestjs/common';
import { CategoriesService } from './services/categories.service';
import { CategoriesController } from './controllers/categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/core/typeorm/entities/category.entity';
import { CategoryTypeOrmRepository } from './data/categories.typeorm.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoriesController],
  providers: [CategoriesService,
    {
      provide: 'categoryRepository',
      useClass: CategoryTypeOrmRepository
    },
  ],
})
export class CategoriesModule { }
