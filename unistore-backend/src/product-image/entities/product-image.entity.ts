import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Produit } from 'src/produit/entities/produit.entity';

@Entity()
export class ProductImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image_url: string;

  @Column({ default: false })
  is_primary: boolean;

  @ManyToOne(() => Produit, (product) => product.images)
  product: Produit;
}