import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class VerifyAccountDto {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsOptional()
  @IsString()
  name?: string;
}
