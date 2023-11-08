import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // app.enableCors({
  //   origin: ['http;//localhost:5137'],
  //   allowedHeaders: [
  //     'Accept',
  //     'Authorization',
  //     'Content-Type',
  //     'X-Requested-With',
  //     'apollo-require-preflight',
  //   ],
  //   credentials: true
  // })
  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 1 }))
  await app.listen(3000);
}
bootstrap();
