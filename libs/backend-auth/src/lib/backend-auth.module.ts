import { Module, Provider } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AppAuthController } from './controller/auth.controller';
import { AppAuthService } from './service/auth.service';

export const authModuleProviders: Provider[] = [AppAuthService];

@Module({
  imports: [
    JwtModule.register({
      secret: 'jwtsecret', // TODO: should be set from .env
    }),
  ],
  exports: [JwtModule],
  controllers: [AppAuthController],
  providers: [...authModuleProviders],
})
export class AppAuthModule {}
