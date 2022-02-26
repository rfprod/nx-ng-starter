import { BackendAuthModule } from '@app/backend-auth';
import { BackendDiagnosticsModule } from '@app/backend-diagnostics';
import { BackendGqlModule } from '@app/backend-gql';
import { BackendGrpcModule } from '@app/backend-grpc';
import { API_ENV } from '@app/backend-interfaces';
import { BackendLoggerModule } from '@app/backend-logger';
import { BackendWebsocketModule } from '@app/backend-websocket';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { environment } from '../environments/environment';

/**
 * Root API application module.
 */
@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 10000,
        maxRedirects: 5,
      }),
    }),
    BackendDiagnosticsModule.forRoot(),
    BackendAuthModule,
    BackendWebsocketModule,
    BackendLoggerModule,
    BackendGqlModule.forRoot(environment),
    BackendGrpcModule.forRoot(environment),
  ],
  providers: [
    {
      provide: API_ENV,
      useValue: environment,
    },
  ],
})
export class ApiAppModule {}
