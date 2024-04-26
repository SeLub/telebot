import Settings from './config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const config = new DocumentBuilder()
  .setTitle('PostUp24')
  .setDescription('API documentation')
  .setVersion('1.0')
  .addTag('users')
  .build();

async function bootstrap() {
  // FastifyAdapter is used to run the app on Fastify
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  // Swagger is used to generate documentation for the API
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Server is started on the specified port
  await app
    .listen(Number(Settings.serverPort))
    .then(() =>
      console.log(`🚀 Server started on port 👉 ${Settings.serverPort}`),
    );
}
bootstrap();
