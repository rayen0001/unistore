import { PartialType } from '@nestjs/mapped-types';
import { CreateProduitDto } from './create-produit.dto';
import { Etat } from '../Etat';

export class UpdateProduitDto extends PartialType(CreateProduitDto) {

name?: string;
marque?: string;
Prix?: number;
stock?:number;
description: string;
category_id?: number;
etat:Etat;

}
