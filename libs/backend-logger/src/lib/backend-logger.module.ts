import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { BackendLoggerMiddleware } from './middleware/logger.middleware';

@Module({})
export class BackendLoggerModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(BackendLoggerMiddleware).forRoutes('*');
  }
}
