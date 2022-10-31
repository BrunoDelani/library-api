import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/core/typeorm/entities/category.entity';
import { Like, Repository } from 'typeorm';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { FindCategoryDto } from '../dtos/find-category.dto';
import { CategoryRepository } from './categories.repository';

export class CategoryTypeOrmRepository implements CategoryRepository {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(payload: CreateCategoryDto): Promise<Category> {
    return this.categoryRepository.save(payload);
  }

  async findAll(query: FindCategoryDto): Promise<Category[]> {
    const { name } = query;
    const categories = await this.categoryRepository.find({
      where: { name: name ? Like(`%${name}%`) : Like('%%') },
    });
    return categories;
  }

  async findOne(id: string): Promise<Category | null> {
    return this.categoryRepository.findOne({ where: { id } });
  }

  findOneByName(name: string): Promise<Category | null> {
    return this.categoryRepository.findOne({ where: { name } });
  }
  update(payload: Category): Promise<Category> {
    return this.categoryRepository.save(payload);
  }
  async remove(id: string): Promise<void> {
    this.categoryRepository.delete(id);
  }
}
