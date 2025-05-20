import { IsString, IsEmail, IsInt, Min, Max, IsDate, IsEnum } from 'class-validator';
import { Role } from '../Role';

export class CreateUserDto {
  @IsString()
  name: string;
 
  @IsEmail()
  email: string;
  @IsString()
  password: string;

  role:Role
 
   isEmailVerified: boolean;

}
