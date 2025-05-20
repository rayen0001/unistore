import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Role } from '../Role';
import { Commande } from 'src/commande/entities/commande.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
  @Column({ nullable: true })
  age: number;
  @Column({ nullable: true })
  tel: string;
  @Column({ nullable: true })
  adresse: string;
  @Column()
  role:Role
  @Column({ nullable: true })

  @Column({ default: false })
  isEmailVerified: boolean;
  @OneToMany(() => Commande, commande => commande.user)
  commandes: Commande[];
}
