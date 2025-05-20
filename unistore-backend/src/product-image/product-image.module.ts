import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImage } from './entities/product-image.entity';
import { ImageService } from './product-image.service';
import { ImageController } from './product-image.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductImage])], // Register the ProductImage entity
  providers: [ImageService], // Register the ImageService
  controllers: [ImageController], // Register the ImageController
  exports: [ImageService], // Export the ImageService if needed by other modules
})
export class ProductImageModule {}