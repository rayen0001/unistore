import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
  Param,
  Get,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import { ImageService } from './product-image.service';
import { ProductImage } from './entities/product-image.entity';

@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  // Upload multiple images for a product
  @Post('bulk-upload/:productId')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const filename = `${uuidv4()}${path.extname(file.originalname)}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async uploadBulkImages(
    @UploadedFiles() files: Express.Multer.File[],
    @Param('productId') productId: number,
  ): Promise<ProductImage[]> {
    // Generate image URLs
    const imageUrls = files.map(
      (file) => `http://localhost:3000/uploads/${file.filename}`,
    );

    // Save images in the database
    return this.imageService.uploadBulkImages(productId, imageUrls);
  }

  // Get all images for a product
  @Get('product/:productId')
  async getImagesByProductId(
    @Param('productId') productId: number,
  ): Promise<ProductImage[]> {
    return this.imageService.getImagesByProductId(productId);
  }
}