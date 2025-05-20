import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { CategoryRepository } from './category.repository';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Category]),
  AuthModule,JwtModule
  ],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository],
  exports:[JwtModule]
})
export class CategoryModule {}