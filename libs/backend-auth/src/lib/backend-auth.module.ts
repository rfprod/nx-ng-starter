import { Module, Provider } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { BackendAuthController } from './controller/auth.controller';
import { BackendAuthService } from './service/auth.service';

export const authModuleProviders: Provider[] = [BackendAuthService];

@Module({
  imports: [
    JwtModule.register({
      secret: 'jwtsecret', // TODO: should be set from .env
    }),
  ],
  exports: [JwtModule],
  controllers: [BackendAuthController],
  providers: [...authModuleProviders],
})
export class BackendAuthModule {}
