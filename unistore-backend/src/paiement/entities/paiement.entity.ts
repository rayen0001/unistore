import { Column, Double, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Method } from "../Method";
import { Commande } from "src/commande/entities/commande.entity";

@Entity()
export class Paiement {
@PrimaryGeneratedColumn()
id: number;
@Column({ type: 'double precision' })
montant:number
@Column()
method:Method


@OneToOne(() => Commande, (commande) => commande.paiement)
  commande: Commande;

}
