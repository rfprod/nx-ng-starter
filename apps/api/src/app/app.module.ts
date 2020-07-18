import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { API_ENV } from '@nx-ng-starter/api-interface';

import { environment } from '../environments/environment';
import { ApiLoggerMiddleware } from './middleware/logger/logger.middleware';
import { ApiAuthModule } from './modules/auth/auth.module';
import { ApiGqlModule } from './modules/graphql/graphql-api.module';
import { ApiGrpcApiModule } from './modules/grpc/grpc.module';
import { ApiWebsocketModule } from './modules/websocket/websocket.module';

/**
 * Root API application module.
 */
@Module({
  imports: [ApiAuthModule, ApiWebsocketModule, ApiGqlModule.forRoot(environment), ApiGrpcApiModule],
  providers: [
    {
      provide: API_ENV,
      useValue: environment,
    },
  ],
})
export class ApiAppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiLoggerMiddleware).forRoutes('*');
  }
}
