import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Commande } from './entities/commande.entity';
import { User } from 'src/user/entities/user.entity';
import { Produit } from 'src/produit/entities/produit.entity';
import { Paiement } from 'src/paiement/entities/paiement.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommandeDto } from './dto/create-commande.dto';
import { State } from './State';
import { Method } from 'src/paiement/Method';

@Injectable()
export class CommandeService {
  constructor(
        @InjectRepository(Commande)
    private readonly commandeRepository: Repository<Commande>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Produit)
    private readonly produitRepository: Repository<Produit>,

    @InjectRepository(Paiement)
    private readonly paiementRepository: Repository<Paiement>,
  ) {}

  async findAll(): Promise<Commande[]> {
    return this.commandeRepository.find({
      relations: ['user', 'commandeProduits.produit', 'paiement','commandeProduits'],
    });
  }

  async findOne(id: number): Promise<Commande | null> {
    return this.commandeRepository.findOne({
      where: { id },
      relations: ['user', 'produits', 'paiement','commandeProduits'],
    });
  }
async create(createCommandeDto: CreateCommandeDto): Promise<Commande> {
  const user = await this.userRepository.findOne({ where: { email: createCommandeDto.userEmail } });
  if (!user) throw new NotFoundException('User not found');

  const commande = this.commandeRepository.create({
    user,
    status: State.ATT,
    dateCommande: new Date(),
    commandeProduits: [],
  });

  let totalMontant = 0;

  for (const item of createCommandeDto.produits) {
    const produit = await this.produitRepository.findOne({ where: { id: item.id } });
    if (!produit) throw new NotFoundException(`Produit ${item.name} not found`);

    if (produit.stock < item.quantity) {
      throw new BadRequestException(`Insufficient stock for product ${item.name}`);
    }

    produit.stock -= item.quantity;
    await this.produitRepository.save(produit);

    // Add to total montant
    totalMontant += produit.Prix * item.quantity;

    commande.commandeProduits.push({
      produit,
      quantity: item.quantity,
    } as any);
  }

  // Create payment using calculated montant
  const paiement = this.paiementRepository.create({
    montant: totalMontant,
    method: createCommandeDto.paiement?.method ?? Method.DEFAULT, // or any default
    commande,
  });

  await this.paiementRepository.save(paiement);

  commande.paiement = paiement;

  return this.commandeRepository.save(commande);
}



  async update(id: number, updateData: Partial<Commande>): Promise<Commande> {
    const commande = await this.findOne(id);
    if (!commande) throw new NotFoundException(`Commande with ID ${id} not found`);

    Object.assign(commande, updateData);
    return this.commandeRepository.save(commande);
  }

  async remove(id: number): Promise<void> {
    const commande = await this.findOne(id);
    if (!commande) throw new NotFoundException(`Commande with ID ${id} not found`);
    await this.commandeRepository.remove(commande);
  }

  async attachPaiement(commandeId: number, paiementId: number): Promise<Commande> {
    const commande = await this.findOne(commandeId);
    if (!commande) throw new NotFoundException(`Commande with ID ${commandeId} not found`);

    const paiement = await this.paiementRepository.findOneBy({ id: paiementId });
    if (!paiement) throw new NotFoundException(`Paiement with ID ${paiementId} not found`);

    commande.paiement = paiement;
    return this.commandeRepository.save(commande);
  }

  async addProduit(commandeId: number, produitId: number): Promise<Commande> {
    const commande = await this.findOne(commandeId);
    if (!commande) throw new NotFoundException(`Commande with ID ${commandeId} not found`);

    const produit = await this.produitRepository.findOneBy({ id: produitId });
    if (!produit) throw new NotFoundException(`Produit with ID ${produitId} not found`);

    commande.produits.push(produit);
    return this.commandeRepository.save(commande);
  }

  async removeProduit(commandeId: number, produitId: number): Promise<Commande> {
    const commande = await this.findOne(commandeId);
    if (!commande) throw new NotFoundException(`Commande with ID ${commandeId} not found`);

    commande.produits = commande.produits.filter(p => p.id !== produitId);
    return this.commandeRepository.save(commande);
  }
 async findOneBy(email: string): Promise<Commande | null> {
  return await this.commandeRepository.findOne({
    where: {
      user: {
        email: email,
      },
    },
      relations: ['user', 'produits', 'paiement','commandeProduits'],
  });
}


}
