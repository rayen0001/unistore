import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Find all users
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }
  async updatePassword(email: string, newPassword: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { email } });
  
    if (!user) {
      throw new BadRequestException('User not found');
    }
  
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
  
    await this.userRepository.save(user);
  }

  // Find a user by email
  async findOneBy(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email } });
  }

  // Find a user by ID
  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  // Create a new user
  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create({
      ...createUserDto,
    });
    return await this.userRepository.save(newUser);
  }

  // Update an existing user
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id); // Ensure user exists
    Object.assign(user, updateUserDto); // Update user with new values
    return await this.userRepository.save(user);
  }

  // Remove a user by ID
  async remove(id: number): Promise<void> {
    const user = await this.findOne(id); // Ensure user exists
    await this.userRepository.remove(user);
  }
  async updateUser(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
// user.service.ts
async verifyEmail(email: string): Promise<void> {
  const user = await this.userRepository.findOne({ where: { email } });
  if (!user) throw new BadRequestException('User not found');

  user.isEmailVerified = true;
  await this.userRepository.save(user);
}

}
