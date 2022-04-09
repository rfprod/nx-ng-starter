import { Logger } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';

import { AppSeverProdModule } from './app/server-prod.module';

/**
 * Bootstraps the simple web client production server.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppSeverProdModule);

  const globalPrefix = '';
  app.setGlobalPrefix(globalPrefix);

  const corsOptions: CorsOptions = {
    origin: [/localhost/, /nx-ng-starter\.web\.app/, /nx-ng-starter\.firebaseap\.com/, /nx-ng-starter-documentation\.firebaseap\.com/],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    credentials: true,
  };
  app.enableCors(corsOptions);

  app.use(
    compression.default({
      threshold: 0,
      level: -1,
    }),
  );

  const defaultPort = 8080;
  const port = process.env.PORT ?? defaultPort;
  await app.listen(port);

  Logger.log(`🚀 Simple production server is running on: http://localhost:${port}/${globalPrefix}`);
}

void bootstrap();
