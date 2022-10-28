import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "src/core/typeorm/entities/category.entity";
import { Repository } from "typeorm";
import { CreateCategoryDto } from "../dtos/create-category.dto";
import { FindCategoryDto } from "../dtos/find-category.dto";
import { UpdateCategoryDto } from "../dtos/update-category.dto";
import { CategoryRepository } from "./categories.repository";

export class CategoryTypeOrmRepository implements CategoryRepository {
    constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>) { }
    create(payload: CreateCategoryDto): Promise<Category> {
        throw new Error("Method not implemented.");
    }
    findAll(query: FindCategoryDto): Promise<Category[]> {
        throw new Error("Method not implemented.");
    }
    findOne(id: number): Promise<Category> {
        throw new Error("Method not implemented.");
    }
    update(id: number, payload: UpdateCategoryDto): Promise<Category> {
        throw new Error("Method not implemented.");
    }
    remove(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
}