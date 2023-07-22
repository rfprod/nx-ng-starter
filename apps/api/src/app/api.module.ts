import { AppAuthModule } from '@app/backend-auth';
import { AppDiagnosticsModule } from '@app/backend-diagnostics';
import { AppGqlModule } from '@app/backend-gql';
import { AppGrpcModule } from '@app/backend-grpc';
import { API_ENV } from '@app/backend-interfaces';
import { AppLoggerModule } from '@app/backend-logger';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

import { environment } from '../environments/environment';

/**
 * Caching configuration.
 * @returns caching module configuration
 */
const caching = () => {
  const defaultConfig = {
    max: 10,
    ttl: 60000,
  };
  return CacheModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (config: ConfigService) => ({
      isGlobal: true,
      max: config.get('CACHE_MAX') ?? defaultConfig.max,
      ttl: config.get('CACHE_TTL') ?? defaultConfig.ttl,
    }),
    inject: [ConfigService],
  });
};

/**
 * Throttling configuration.
 * @returns throttling module configuration
 */
const throttling = () => {
  const defaultConfig = {
    limit: 60,
    ttl: 60,
  };
  return ThrottlerModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
      limit: config.get('THROTTLE_LIMIT') ?? defaultConfig.limit,
      ttl: config.get('THROTTLE_TTL') ?? defaultConfig.ttl,
    }),
  });
};

/**
 * The API application root module.
 */
@Module({
  imports: [
    caching(),
    throttling(),
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 10000,
        maxRedirects: 5,
      }),
    }),
    AppDiagnosticsModule.forRoot(),
    AppAuthModule,
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
