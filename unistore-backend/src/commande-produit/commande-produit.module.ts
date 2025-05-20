import { Module } from '@nestjs/common';
import { CommandeProduitService } from './commande-produit.service';
import { CommandeProduitController } from './commande-produit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Produit } from 'src/produit/entities/produit.entity';

@Module({
  imports:[    TypeOrmModule.forFeature([Produit]) // <-- IMPORTANT
  ],
  controllers: [CommandeProduitController],
  providers: [CommandeProduitService],
})
export class CommandeProduitModule {}
