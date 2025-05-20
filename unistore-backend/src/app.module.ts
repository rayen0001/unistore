import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './category/category.module';
import { ProduitModule } from './produit/produit.module';
import { CommandeModule } from './commande/commande.module';
import { PaiementModule } from './paiement/paiement.module';
import { User } from './user/entities/user.entity';
import { Produit } from './produit/entities/produit.entity';
import { Category } from './category/entities/category.entity';
import { Commande } from './commande/entities/commande.entity';
import { Paiement } from './paiement/entities/paiement.entity';
import { ProductImageModule } from './product-image/product-image.module';
import { ProductImage } from './product-image/entities/product-image.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtStrategy } from './auth/JwtStrategy';
import { LocalStrategy } from './auth/local.strategy';
import { JwtGuard } from './auth/jwt/jwt.guard';
import { CommandeProduitModule } from './commande-produit/commande-produit.module';
import { CommandeProduit } from './commande-produit/entities/commande-produit.entity';

@Module({
  imports: [
    // Serve static files from the 'uploads' directory
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Path to the uploads directory
      serveRoot: '/uploads', // URL path to serve the files from
    }),

    // Configure TypeORM for PostgreSQL
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5400,
      username: 'postgres',
      password: 'root',
      database: 'nest_db',
      entities: [Produit, Category, Commande, Paiement, User, ProductImage, CommandeProduit,],
      autoLoadEntities: true,
      synchronize: true, // Automatically sync entities with the database (disable in production)
    }),

    // Configuration module
    ConfigModule.forRoot({
      isGlobal: true, // Ensure ConfigModule is global
      envFilePath: 'src/.env', // Path to your .env file
    }),

    // Import feature modules
    UserModule,
    CategoryModule,
    ProduitModule,
    CommandeModule,
    PaiementModule,
    ProductImageModule,
    AuthModule,
    CommandeProduitModule,
    
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    JwtStrategy,
    LocalStrategy,
  ],
})
export class AppModule {}
