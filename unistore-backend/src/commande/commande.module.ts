import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Commande } from './entities/commande.entity';
import { CommandeService } from './commande.service';
import { CommandeController } from './commande.controller';

import { User } from 'src/user/entities/user.entity';
import { Produit } from 'src/produit/entities/produit.entity';
import { Paiement } from 'src/paiement/entities/paiement.entity';
import { CommandeProduit } from 'src/commande-produit/entities/commande-produit.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Commande, User, Produit, Paiement,CommandeProduit]) // <-- IMPORTANT
  ],
  controllers: [CommandeController],
  providers: [CommandeService],
})
export class CommandeModule {}
