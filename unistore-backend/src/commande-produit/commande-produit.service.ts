import { Injectable } from '@nestjs/common';
import { CreateCommandeProduitDto } from './dto/create-commande-produit.dto';
import { UpdateCommandeProduitDto } from './dto/update-commande-produit.dto';

@Injectable()
export class CommandeProduitService {
  create(createCommandeProduitDto: CreateCommandeProduitDto) {
    return 'This action adds a new commandeProduit';
  }

  findAll() {
    return `This action returns all commandeProduit`;
  }

  findOne(id: number) {
    return `This action returns a #${id} commandeProduit`;
  }

  update(id: number, updateCommandeProduitDto: UpdateCommandeProduitDto) {
    return `This action updates a #${id} commandeProduit`;
  }

  remove(id: number) {
    return `This action removes a #${id} commandeProduit`;
  }
}
