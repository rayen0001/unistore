import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductImage } from './entities/product-image.entity';
import { Public } from 'src/auth/public-strategy';


@Injectable()
@Public()
export class ImageService {
  constructor(
    @InjectRepository(ProductImage)
    private imageRepository: Repository<ProductImage>,
  ) {}

  async uploadBulkImages(productId: number, imageUrls: string[]): Promise<ProductImage[]> {
    const images = imageUrls.map((url) =>
      this.imageRepository.create({ product: { id: productId }, image_url: url }),
    );
    return this.imageRepository.save(images);
  }
  async getImagesByProductId(productId: number): Promise<ProductImage[]> {
    return this.imageRepository.find({
      where: { product: { id: productId } }, // Filter by product ID
      relations: ['product'], // Include the related product data (optional)
    });
  }
}