import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';

import express from 'express';

import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { AppModule } from './app/app.module';

/**
 * Express server.
 */
const server: express.Express = express();

/**
 * Defult port value.
 */
const defaultPort = 3333;

/**
 * Bootstraps server.
 */
async function bootstrap(expressInstance: express.Express): Promise<any> {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressInstance));
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe());
  const port = process.env.port || defaultPort;
  await app.listen(port, () => {
    console.log(`Listening at http://localhost: ${port}/${globalPrefix}`);
  });
}

bootstrap(server);

/**
 * Firebase configuration.
 */
const firebaseConfig = process.env.FIREBASE_CONFIG;

/**
 * Initialize admin and export firebase functions only in cloud environment.
 */
if (firebaseConfig) {
  admin.initializeApp();
  exports.graphql = functions.https.onRequest(server);
}
