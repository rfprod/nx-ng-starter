import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { API_ENV } from '@nx-ng-starter/api-interface';

import { environment } from '../environments/environment';
import { LoggerMiddleware } from './middleware/logger/logger.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { GqlApiModule } from './modules/graphql/graphql-api.module';
import { GrpcApiModule } from './modules/grpc/grpc-api.module';
import { WebsocketApiModule } from './modules/websocket/websocket.module';

/**
 * Root API application module.
 */
@Module({
  imports: [AuthModule, WebsocketApiModule, GqlApiModule.forRoot(environment), GrpcApiModule],
  providers: [
    {
      provide: API_ENV,
      useValue: environment,
    },
  ],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
