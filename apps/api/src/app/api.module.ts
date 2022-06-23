import { AppAuthModule } from '@app/backend-auth';
import { AppDiagnosticsModule } from '@app/backend-diagnostics';
import { AppGqlModule } from '@app/backend-gql';
import { AppGrpcModule } from '@app/backend-grpc';
import { API_ENV } from '@app/backend-interfaces';
import { AppLoggerModule } from '@app/backend-logger';
import { AppWebsocketModule } from '@app/backend-websocket';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { environment } from '../environments/environment';

/**
 * The API application root module.
 */
@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 10000,
        maxRedirects: 5,
      }),
    }),
    AppDiagnosticsModule.forRoot(),
    AppAuthModule,
    AppWebsocketModule,
    AppLoggerModule,
    AppGqlModule.forRoot(environment),
    AppGrpcModule.forRoot(environment),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [
    {
      provide: API_ENV,
      useValue: environment,
    },
  ],
})
export class AppApiModule {}
