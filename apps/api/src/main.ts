import 'reflect-metadata';

import { type INestApplication, Logger } from '@nestjs/common';
import type { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { WsAdapter } from '@nestjs/platform-ws';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import dotenv from 'dotenv';
import e from 'express';
import * as functions from 'firebase-functions';

import { AppApiModule } from './app/api.module';
import { environment } from './environments/environment';

/**
 * Express server.
 */
const server: e.Express = e();
/**
 * Defult port value.
 */
const defaultPort = 8080;
/**
 * Global prefix for the API endpoints.
 */
const globalPrefix = 'api';

/**
 * Load environment variables.
 */
dotenv.config();

/**
 * Bootstraps server.
 */
async function bootstrap(expressInstance: e.Express): Promise<INestApplication> {
  const adapter = new ExpressAdapter(expressInstance);
  const app: INestApplication<e.Express> = await NestFactory.create(AppApiModule, adapter);
  app.useWebSocketAdapter(new WsAdapter(app));

  app.setGlobalPrefix(globalPrefix);
  const corsOptions: CorsOptions = {
    origin: [/localhost/, /firebase\.app/, /web\.app/],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    credentials: true,
  };
  app.enableCors(corsOptions);

  app.use(compression.default({ threshold: 0, level: -1 }));

  const config = new DocumentBuilder().setTitle(environment.appName).setVersion('1.0').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('index.html', app, document);
  adapter.get('', (req, res: e.Response) => {
    res.redirect('/index.html');
  });

  if (typeof process.env['FIREBASE_CONFIG'] === 'undefined' || process.env['FIREBASE_CONFIG'] === '') {
    const port = typeof process.env['port'] !== 'undefined' ? process.env['port'] : defaultPort;
    await app.listen(port, () => {
      Logger.log(`Listening http://localhost:${port}/${globalPrefix}/`);
    });
  }

  return app.init();
}

void bootstrap(server);

/**
 * Expose api.
 */
export const api = functions.https.onRequest(server);
