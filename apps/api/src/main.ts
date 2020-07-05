import { ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { ExpressAdapter } from '@nestjs/platform-express';
import { WsAdapter } from '@nestjs/platform-ws';
import { defaultWsPort } from '@nx-ng-starter/api-interface';
import e from 'express';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { AppModule } from './app/app.module';
import { grpcApiClientOptions } from './app/modules/grpc/grpc-api-client.options';
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
 * Bootstraps server.
 */
async function bootstrap(expressInstance: e.Express): Promise<unknown> {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressInstance));
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

  // TODO: debug grpc in firebase, currently it causes all functions deployment failure
  if (!environment.firebase) {
    app.connectMicroservice<MicroserviceOptions>(grpcApiClientOptions);
    await app.startAllMicroservicesAsync();
  }

  const port = process.env.port ? process.env.port : defaultPort;
  await app.listen(port, () => {
    console.warn(`Listening at:
    - http://localhost:${port}/${globalPrefix}/ping
    - http://localhost:${port}/${globalPrefix}/signup
    - http://localhost:${port}/${globalPrefix}/login
    - http://localhost:${port}/${globalPrefix}/logout
    - http://localhost:${port}/${globalPrefix}/graphql
    - http://localhost:${port}/${globalPrefix}/grpc
    - http://localhost:${port}/${globalPrefix}/grpc/:id
    - ws://localhost:${defaultWsPort}/api/events`);
  });

  return app.init();
}

void bootstrap(server);

/**
 * Firebase configuration.
 */
const firebaseConfig = process.env.FIREBASE_CONFIG;

/**
 * Initialize admin and export firebase functions only in cloud environment.
 */
if (firebaseConfig) {
  admin.initializeApp();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  exports.ping = functions.https.onRequest(server);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  exports.login = functions.https.onRequest(server);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  exports.logout = functions.https.onRequest(server);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  exports.signup = functions.https.onRequest(server);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  exports.graphql = functions.https.onRequest(server);
  // TODO: handle websocket events exports.events = functions.https.onRequest(server);
  // TODO: exports.grpc = functions.https.onRequest(server);
}
