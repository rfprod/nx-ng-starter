import { Module, Provider } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AppAuthController } from './controller/auth.controller';
import { AppAuthService } from './service/auth.service';

export const authModuleProviders: Provider[] = [AppAuthService];

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
  exports: [JwtModule],
  controllers: [AppAuthController],
  providers: [...authModuleProviders],
})
export class AppAuthModule {}
