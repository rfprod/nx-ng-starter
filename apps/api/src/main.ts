/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/
import { Express } from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app/app.module';

import express from 'express';
import * as functions from 'firebase-functions';

const server: Express = express();


/**
 * Bootstraps server.
 */
async function bootstrap(expressInstance: Express): Promise<any> {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance)
  );
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe());
  const port = process.env.port || 3333;
  await app.listen(port, () => {
    console.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap(server);

exports.carrierGraphql = functions.https.onRequest(server);
