import { Module, Provider } from '@nestjs/common';

import { AuthController } from './controller/auth.controller';

import { AuthService } from './service/auth.service';

import { AuthUtilsModule } from '../auth-utils/auth-utils.module';
import { AuthUtilsService } from '../auth-utils/service/auth-utils.service';

export const authModuleProviders: Provider[] = [AuthService, AuthUtilsService];

@Module({
  imports: [AuthUtilsModule],
  exports: [AuthUtilsModule],
  controllers: [AuthController],
  providers: [...authModuleProviders],
})
export class AuthModule {}
