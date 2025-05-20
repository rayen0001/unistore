import { Category } from "src/category/entities/category.entity";
import { Commande } from "src/commande/entities/commande.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Etat } from "../Etat";
import { ProductImage } from "src/product-image/entities/product-image.entity";
import { CommandeProduit } from "src/commande-produit/entities/commande-produit.entity";


@Entity()
export class Produit {

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column()
    marque: string;

    @Column()
    description: string;
  
    @Column({ type: 'float' }) 
    Prix: number; 

    @Column()
    stock: number;    
    @Column()
    etat: Etat;

    @Column({unique:true})
    ref:string;
   
     @ManyToOne(() => Category, Category => Category.produits)
     @JoinColumn({ name: 'category_id' })
     category: Category;
     
     @OneToMany(() => ProductImage, (image) => image.product)
     images: ProductImage[];
     @OneToMany(() => CommandeProduit, cp => cp.produit)
commandeProduits: CommandeProduit[];




}
