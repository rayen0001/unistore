import { IsEmail } from 'class-validator';

export class ReverifyDto {
  @IsEmail()
  email: string;
}
