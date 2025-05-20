import { Produit } from "src/produit/entities/produit.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, TreeChildren, TreeParent } from "typeorm";

@Entity()
export class Category {
        @PrimaryGeneratedColumn()
        id: number;
        
          @Column()
          label: string;
        
          @OneToMany(() => Produit, produits => produits.category)
          produits: Produit[];
          @TreeParent()
          parent: Category;
        
          @TreeChildren()
          children: Category[];
}
