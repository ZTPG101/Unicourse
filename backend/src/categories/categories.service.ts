import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Category } from 'src/database/entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('CATEGORY_REPOSITORY') private categoryRepo: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryRepo.find();
  }

  async findById(id: number): Promise<Category> {
    const category = await this.categoryRepo.findOne({ where: { id } });
    if (!category)
      throw new NotFoundException(`Category with id ${id} not found`);
    return category;
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.categoryRepo.findOne({ where: { name } });
    if (!category)
      throw new NotFoundException(`Category with name '${name}' not found`);
    return category;
  }

  async create(data: Partial<Category>): Promise<Category> {
    const category = this.categoryRepo.create(data);
    return this.categoryRepo.save(category);
  }

  async update(id: number, data: Partial<Category>): Promise<Category> {
    const category = await this.categoryRepo.preload({ id, ...data });
    if (!category)
      throw new NotFoundException(`Category with id ${id} not found`);
    return this.categoryRepo.save(category);
  }

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.categoryRepo.delete({ id });
    if (!result.affected)
      throw new NotFoundException(`Category with id ${id} not found`);
    return { message: 'Category deleted successfully.' };
  }
}
