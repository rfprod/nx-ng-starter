import { backendGrpcClientOptions } from '@app/backend-grpc';
import { defaultWsPort } from '@app/backend-interfaces';
import { ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { ExpressAdapter } from '@nestjs/platform-express';
import { WsAdapter } from '@nestjs/platform-ws';
import e from 'express';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { ApiAppModule } from './app/app.module';
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
 * Firebase configuration.
 */
const firebaseConfig = process.env.FIREBASE_CONFIG;

/**
 * Bootstraps server.
 */
async function bootstrap(expressInstance: e.Express): Promise<unknown> {
  const app = await NestFactory.create(ApiAppModule, new ExpressAdapter(expressInstance));
  app.useWebSocketAdapter(new WsAdapter(app));

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe());

  const corsOptions: CorsOptions = {
    origin: [/localhost/, /firebase\.app/, /web\.app/],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    credentials: true,
  };
  app.enableCors(corsOptions);

  const grpcClientOptions = backendGrpcClientOptions(environment);
  app.connectMicroservice<MicroserviceOptions>(grpcClientOptions);
  await app.startAllMicroservices();

  if (typeof firebaseConfig === 'undefined' || firebaseConfig === '') {
    const port = typeof process.env.port !== 'undefined' ? process.env.port : defaultPort;
    await app.listen(port, () => {
      console.warn(`Listening at:
    - http://localhost:${port}/${globalPrefix}/auth
      - http://localhost:${port}/${globalPrefix}/auth/signup
      - http://localhost:${port}/${globalPrefix}/auth/login
      - http://localhost:${port}/${globalPrefix}/auth/logout
    - http://localhost:${port}/${globalPrefix}/graphql
    - http://localhost:${port}/${globalPrefix}/grpc
      - http://localhost:${port}/${globalPrefix}/grpc/:id
    - ws://localhost:${defaultWsPort}/api/events`);
    });
  }

  return app.init();
}

void bootstrap(server);

/**
 * Initialize admin and export firebase functions only in cloud environment.
 */
if (environment.firebase === true && typeof firebaseConfig !== 'undefined') {
  admin.initializeApp();
}

/**
 * Expose api.
 */
export const api = functions.https.onRequest(server);
