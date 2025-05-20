import { IsArray, ValidateNested, IsNumber, IsNotEmpty, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { Produit } from 'src/produit/entities/produit.entity';
import { Method } from 'src/paiement/Method';

class ProduitWithQuantity extends Produit {
  @IsInt()
  @Min(1)
  quantity: number;

;


}

export class CreateCommandeDto {
  @IsNumber()
  userEmail: string;
 paiement?: {
    montant: number;
    method: Method; // or string if Method is an enum or string
  };
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProduitWithQuantity)
  produits: ProduitWithQuantity[];

  @IsNotEmpty()
  status: string;
}