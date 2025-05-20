import { Entity, ManyToOne, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Produit } from 'src/produit/entities/produit.entity';
import { Commande } from 'src/commande/entities/commande.entity';

@Entity()
export class CommandeProduit {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Commande, commande => commande.commandeProduits, { onDelete: 'CASCADE' })
  commande: Commande;

  @ManyToOne(() => Produit, produit => produit.commandeProduits)
  produit: Produit;

  @Column()
  quantity: number;
}
