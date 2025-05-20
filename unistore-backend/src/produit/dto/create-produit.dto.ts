import { Category } from "src/category/entities/category.entity";
import { Etat } from "../Etat";

export class CreateProduitDto {
    name: string;
    marque: string;
    description: string;
    Prix: number;
    stock:number;
    category: Category;
    ref:string;
    etat:Etat;
  }