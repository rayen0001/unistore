import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find({
      relations: ['parent', 'children']
    });
  }
 
  async findOne(id: number): Promise<Category | null> {
    return this.categoryRepository.findOne({
      where: { id },
      relations: ['parent', 'children']
    });
  }

  async create(categoryData: Partial<Category>): Promise<Category> {
    const category = this.categoryRepository.create(categoryData);
    return this.categoryRepository.save(category);
  }

  async update(id: number, categoryData: Partial<Category>): Promise<Category> {
    const category = await this.findOne(id);
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    Object.assign(category, categoryData);
    return this.categoryRepository.save(category);
  }

  async delete(id: number): Promise<void> {
    const category = await this.findOne(id);
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    await this.categoryRepository.remove(category);
  }

  async addSubcategory(parentId: number, subcategoryData: Partial<Category>): Promise<Category> {
    const parent = await this.findOne(parentId);
    if (!parent) {
      throw new NotFoundException(`Parent category with ID ${parentId} not found`);
    }

    const subcategory = this.categoryRepository.create({
      ...subcategoryData,
      parent
    });

    return this.categoryRepository.save(subcategory);
  }

  async deleteSubcategory(parentId: number, subcategoryId: number): Promise<void> {
    const subcategory = await this.categoryRepository.findOne({
      where: { id: subcategoryId, parent: { id: parentId } },
      relations: ['parent']
    });

    if (!subcategory) {
      throw new NotFoundException(`Subcategory with ID ${subcategoryId} not found`);
    }

    await this.categoryRepository.remove(subcategory);
  }
}