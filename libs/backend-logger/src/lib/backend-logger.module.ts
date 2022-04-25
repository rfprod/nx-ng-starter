import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AppLoggerMiddleware } from './middleware/logger.middleware';

@Module({})
export class AppLoggerModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
