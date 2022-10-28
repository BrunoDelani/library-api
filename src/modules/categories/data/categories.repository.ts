import { Category } from "src/core/typeorm/entities/category.entity";
import { CreateCategoryDto } from "../dtos/create-category.dto";
import { FindCategoryDto } from "../dtos/find-category.dto";
import { UpdateCategoryDto } from "../dtos/update-category.dto";

export interface CategoryRepository {
    create(payload: CreateCategoryDto): Promise<Category>;
    findAll(query: FindCategoryDto): Promise<Category[]>;
    findOne(id: number): Promise<Category>;
    update(id: number, payload: UpdateCategoryDto): Promise<Category>;
    remove(id: number): Promise<void>;

}