import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "src/core/typeorm/entities/category.entity";
import { Like, Repository } from "typeorm";
import { CreateCategoryDto } from "../dtos/create-category.dto";
import { FindCategoryDto } from "../dtos/find-category.dto";
import { UpdateCategoryDto } from "../dtos/update-category.dto";
import { CategoryRepository } from "./categories.repository";

export class CategoryTypeOrmRepository implements CategoryRepository {
    constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>) { }

    async create(payload: CreateCategoryDto): Promise<Category> {
        return this.categoryRepository.save(payload);
    }

    async findAll(query: FindCategoryDto): Promise<Category[]> {
        const { name } = query;
        const categories = await this.categoryRepository.find({
            where: {
                name: name ? Like(`%${name}%`) : Like('%%')
            },
            select: {
                name: true
            }
        });
        return categories;
    }

    async findOne(id: string): Promise<Category | null> {
        return this.categoryRepository.findOne({ where: { id } });
    }

    findOneByName(name: string): Promise<Category | null> {
        return this.categoryRepository.findOne({ where: { name } })
    }
    update(id: number, payload: UpdateCategoryDto): Promise<Category> {
        throw new Error("Method not implemented.");
    }
    remove(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
}