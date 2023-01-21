import { backendGrpcClientOptions } from '@app/backend-grpc';
import { defaultWsPort } from '@app/backend-interfaces';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { ExpressAdapter } from '@nestjs/platform-express';
import { WsAdapter } from '@nestjs/platform-ws';
import * as compression from 'compression';
import dotenv from 'dotenv';
import e from 'express';
import * as admin from 'firebase-admin';
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
 * Load environment variables.
 */
dotenv.config();

const initAdmin = () => {
  const localCredential = process.env.FIRE_API_CREDENTIAL;
  const localDatabaseURL = process.env.FIRE_DATABASE_URL;

  if (typeof localCredential !== 'undefined' && typeof localDatabaseURL !== 'undefined') {
    const cert = JSON.parse(localCredential !== '' ? localCredential : '{}');

    admin.initializeApp({
      credential: admin.credential.cert(cert),
      databaseURL: localDatabaseURL,
    });
  } else {
    admin.initializeApp();
  }
};

/**
 * Bootstraps server.
 */
async function bootstrap(expressInstance: e.Express): Promise<unknown> {
  const app = await NestFactory.create(AppApiModule, new ExpressAdapter(expressInstance));
  app.useWebSocketAdapter(new WsAdapter(app));

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const corsOptions: CorsOptions = {
    origin: [/localhost/, /firebase\.app/, /web\.app/],
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

  const grpcClientOptions = backendGrpcClientOptions(environment);
  app.connectMicroservice<MicroserviceOptions>(grpcClientOptions);
  await app.startAllMicroservices();

  initAdmin();

  if (typeof process.env.FIREBASE_CONFIG === 'undefined' || process.env.FIREBASE_CONFIG === '') {
    const port = typeof process.env.port !== 'undefined' ? process.env.port : defaultPort;
    await app.listen(port, () => {
      console.warn(`Listening at:
    - http://localhost:${port}/${globalPrefix}/
    - http://localhost:${port}/${globalPrefix}/static
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
 * Expose api.
 */
export const api = functions.https.onRequest(server);
