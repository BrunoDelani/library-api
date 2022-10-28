import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CONNECTION_DB, CONNECTION_HOST, CONNECTION_PASSWORD, CONNECTION_PORT, CONNECTION_USERNAME } from './config/environment.config';
import { Book } from './core/typeorm/entities/book.entity';
import { Category } from './core/typeorm/entities/category.entity';
import { CategoriesModule } from './modules/categories/categories.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: "mysql",
    host: CONNECTION_HOST,
    port: CONNECTION_PORT,
    username: CONNECTION_USERNAME,
    password: CONNECTION_PASSWORD,
    database: CONNECTION_DB,
    entities: [Category, Book],
    synchronize: false,
    autoLoadEntities: true,
    migrationsRun: true,
    migrations: ['./dist/core/typeorm/migrations/*.{js,ts}'],
  }), CategoriesModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
