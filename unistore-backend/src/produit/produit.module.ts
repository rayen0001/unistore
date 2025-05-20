import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProduitService } from './produit.service';
import { ProduitController } from './produit.controller';
import { Produit } from './entities/produit.entity';
import { Category } from '../category/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Produit, Category])],
  controllers: [ProduitController],
  providers: [ProduitService],
})
export class ProduitModule {}
