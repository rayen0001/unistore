import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ProduitService } from './produit.service';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { Produit } from './entities/produit.entity';
import { Public } from 'src/auth/public-strategy';

@Controller('produits')
export class ProduitController {
  constructor(private readonly produitService: ProduitService) {}

  @Post()
  async create(@Body() createProduitDto: CreateProduitDto): Promise<Produit> {
    return this.produitService.create(createProduitDto);
  }
  @Public()

  @Get()
  async findAll(): Promise<Produit[]> {
    return this.produitService.findAll();
  }
  @Public()

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Produit> {
    return this.produitService.findOne(id);
  }
    @Public()

   @Get('category/:id')
  async getByCategory(@Param('id') id: number): Promise<Produit[]> {
    return this.produitService.findByCategoryWithChildren(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProduitDto: UpdateProduitDto,
  ): Promise<Produit> {
    return this.produitService.update(id, updateProduitDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.produitService.remove(id);
  }
}