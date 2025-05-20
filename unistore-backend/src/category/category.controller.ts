import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { Public } from 'src/auth/public-strategy';
import { HasRole } from 'src/auth/has-Roles.decorator';
import { Role } from 'src/user/Role';
import { log } from 'console';
import { request } from 'http';
import { RolesGuard } from 'src/auth/roles/roles.guard';


@Public()

@Controller('categories')

export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // Get all categories
  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  // Get a single category by ID
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Category> {
    const category = await this.categoryService.findOne(id);

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  // Create a new category

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() categoryData: Partial<Category>): Promise<Category> {
    return this.categoryService.create(categoryData);
  }

  // Update a category
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() categoryData: Partial<Category>,
  ): Promise<Category> {
    return this.categoryService.update(id, categoryData);
  }

  // Delete a category
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: number): Promise<void> {
    console.log(request)
    await this.categoryService.delete(id);
  }

  // Add a subcategory to a category
  @Post(':id/subcategories')
  @HttpCode(HttpStatus.CREATED)
  async addSubcategory(
    @Param('id') categoryId: number,
    @Body() subcategoryData: Partial<Category>,
  ): Promise<Category> {
    return this.categoryService.addSubcategory(categoryId, subcategoryData);
  }

  // Delete a subcategory
  @Delete(':categoryId/subcategories/:subcategoryId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteSubcategory(
    @Param('categoryId') categoryId: number,
    @Param('subcategoryId') subcategoryId: number,
  ): Promise<void> {
    await this.categoryService.deleteSubcategory(categoryId, subcategoryId);
  }
 }
