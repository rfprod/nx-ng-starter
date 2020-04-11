import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { environment } from '../environments/environment';
import { LoggerMiddleware } from './middleware/logger/logger.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { GqlApiModule } from './modules/graphql/graphql-api.module';
import { GrpcApiModule } from './modules/grpc/grpc-api.module';

/**
 * Root API application module.
 */
@Module({
  imports: [AuthModule, GqlApiModule.forRoot(environment), GrpcApiModule],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
