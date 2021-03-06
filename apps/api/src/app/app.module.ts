import { Module } from '@nestjs/common';
import { BackendAuthModule } from '@nx-ng-starter/backend-auth';
import { BackendGqlModule } from '@nx-ng-starter/backend-gql';
import { BackendGrpcModule } from '@nx-ng-starter/backend-grpc';
import { API_ENV } from '@nx-ng-starter/backend-interfaces';
import { BackendLoggerModule } from '@nx-ng-starter/backend-logger';
import { BackendWebsocketModule } from '@nx-ng-starter/backend-websocket';

import { environment } from '../environments/environment';

/**
 * Root API application module.
 */
@Module({
  imports: [
    BackendAuthModule,
    BackendWebsocketModule,
    BackendGqlModule.forRoot(environment),
    BackendGrpcModule.forRoot(environment),
    BackendLoggerModule,
  ],
  providers: [
    {
      provide: API_ENV,
      useValue: environment,
    },
  ],
})
export class ApiAppModule {}
