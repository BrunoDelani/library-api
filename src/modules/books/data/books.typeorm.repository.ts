import { BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Book } from "src/core/typeorm/entities/book.entity";
import { FindCategoryDto } from "src/modules/categories/dtos/find-category.dto";
import { Repository } from "typeorm";
import { CreateBookDto } from "../dtos/create-book.dto";
import { BookRepository } from "./books.repository";

export class BookTypeOrmRepository implements BookRepository {
    constructor(
        @InjectRepository(Book)
        private bookRepository: Repository<Book>,
    ) { }
    create(payload: CreateBookDto): Promise<Book> {
        throw new Error("Method not implemented.");
    }
    findAll(query: FindCategoryDto): Promise<Book[]> {
        throw new Error("Method not implemented.");
    }
    findOne(id: string): Promise<Book> {
        throw new Error("Method not implemented.");
    }
    findOneByName(name: string): Promise<Book> {
        throw new Error("Method not implemented.");
    }
    update(payload: Book): Promise<Book | BadRequestException> {
        throw new Error("Method not implemented.");
    }
    remove(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}