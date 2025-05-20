import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS globally
  app.enableCors({
    origin: ['https://yourfrontenddomain.com', 'http://localhost:4200'], // Allow specific origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Headers to allow
    credentials: true, // Allow cookies and credentials
  });

  await app.listen(3000); // Start the server
}
bootstrap();