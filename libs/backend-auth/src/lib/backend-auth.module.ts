import { Module, Provider } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AppAuthController } from './controllers/auth.controller';
import { AppAuthService, AUTH_SERVICE_TOKEN } from './services/auth.service';

export const authModuleProviders: Provider[] = [
  AppAuthService,
  {
    provide: AUTH_SERVICE_TOKEN,
    useExisting: AppAuthService,
  },
];

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => {
        return {
          secret: config.get('JWT_SECRET') ?? 'jwtsecret',
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppAuthController],
  providers: [...authModuleProviders],
  exports: [AUTH_SERVICE_TOKEN],
})
export class AppAuthModule {}
