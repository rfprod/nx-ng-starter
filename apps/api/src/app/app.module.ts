import { BackendAuthModule } from '@app/backend-auth';
import { BackendGqlModule } from '@app/backend-gql';
import { BackendGrpcModule } from '@app/backend-grpc';
import { API_ENV } from '@app/backend-interfaces';
import { BackendLoggerModule } from '@app/backend-logger';
import { BackendWebsocketModule } from '@app/backend-websocket';
import { Module } from '@nestjs/common';

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
