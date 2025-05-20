import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsInt, IsString, Max, Min } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsInt()
    @Min(1)
    @Max(100)
    age: number;
     @IsString()
      adresse: string;
       @IsString()
       tel:string 
       @IsString()
       name:string 
     
     @IsEmail()
  email: string;
      
}
