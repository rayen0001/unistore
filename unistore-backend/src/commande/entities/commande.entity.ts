import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { State } from "../State";
import { User } from "src/user/entities/user.entity";
import { Produit } from "src/produit/entities/produit.entity";
import { Paiement } from "src/paiement/entities/paiement.entity";
import { CommandeProduit } from "src/commande-produit/entities/commande-produit.entity";

@Entity()
export class Commande {

     @PrimaryGeneratedColumn()
     id: number;   

     @Column()
     dateCommande:Date
     
     @Column()
     status:State
 /* previous relationship if any */
 @ManyToOne(() => User, user => user.commandes)
 @JoinColumn({ name: 'user_id' })
 user: User;


 @ManyToMany(() => Produit)
 @JoinTable() // Required to create the junction table
 produits: Produit[];


  @OneToOne(() => Paiement, (paiement) => paiement.commande)
  @JoinColumn() // Required on one side of a One-to-One relationship
  paiement: Paiement;
@OneToMany(() => CommandeProduit, cp => cp.commande, { cascade: true })
commandeProduits: CommandeProduit[];

  
}
