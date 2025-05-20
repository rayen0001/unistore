import { IsArray, IsDateString, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { State } from '../State';

export class UpdateCommandeDto {
  @IsOptional()
  @IsEnum(State)
  status?: State;

  @IsOptional()
  @IsArray()
  produitIds?: number[];

  @IsOptional()
  @IsDateString()
  dateCommande?: Date;
}
