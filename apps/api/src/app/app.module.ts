import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_ENV } from '@nx-ng-starter/api-interface';
import { environment } from '../environments/environment';
import { LoggerMiddleware } from './middleware/logger/logger.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { GqlApiModule } from './modules/graphql/graphql-api.module';
import { GrpcApiModule } from './modules/grpc/grpc-api.module';

/**
 * Root API application module.
 */
@Module({
  imports: [
    AuthModule,
    GqlApiModule.forRoot(environment),
    !environment.firebase ? GrpcApiModule : null,
  ],
  providers: [
    {
      provide: APP_ENV,
      useValue: environment,
    },
  ],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
