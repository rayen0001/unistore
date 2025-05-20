import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Produit } from './entities/produit.entity';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class ProduitService {
  constructor(
    @InjectRepository(Produit)
    private readonly produitRepository: Repository<Produit>,
      @InjectRepository(Category)
  private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createProduitDto: CreateProduitDto): Promise<Produit> {
    const produit = this.produitRepository.create(createProduitDto);
    return await this.produitRepository.save(produit);
  }

  async findAll(): Promise<Produit[]> {
    return await this.produitRepository.find({ relations: ['category','images']});
  }

  async findOne(id: number): Promise<Produit> {
    const produit = await this.produitRepository.findOne({
      where: { id },
      relations: ['category','images'],
    });
    if (!produit) {
      throw new NotFoundException(`Produit with ID ${id} not found`);
    }
    return produit;
  }

  async update(id: number, updateProduitDto: UpdateProduitDto): Promise<Produit> {
    const produit = await this.findOne(id);
    this.produitRepository.merge(produit, updateProduitDto);
    return await this.produitRepository.save(produit);
  }

  async remove(id: number): Promise<void> {
    const produit = await this.findOne(id);
    await this.produitRepository.remove(produit);
  }
   async getAllCategoryIdsRecursive(categoryId: number): Promise<number[]> {
  const category = await this.categoryRepository.findOne({
    where: { id: categoryId },
    relations: ['children'],
  });

  if (!category) {
    throw new NotFoundException(`Category with ID ${categoryId} not found`);
  }

  let ids = [category.id];

  // Recursively fetch children and their descendants
  for (const child of category.children) {
    const childIds = await this.getAllCategoryIdsRecursive(child.id);
    ids.push(...childIds);
  }

  return ids;
}

async findByCategoryWithChildren(categoryId: number): Promise<Produit[]> {
  const categoryIds = await this.getAllCategoryIdsRecursive(categoryId);

  return this.produitRepository.find({
    where: { category: { id: In(categoryIds) } },
    relations: ['category', 'images'],
  });
}

}