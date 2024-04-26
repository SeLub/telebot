import Settings from './config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

console.log(Settings.serverPort);

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  await app
    .listen(Number(Settings.serverPort))
    .then(() =>
      console.log(`🚀 Server started on port 👉 ${Settings.serverPort}`),
    );
}
bootstrap();
