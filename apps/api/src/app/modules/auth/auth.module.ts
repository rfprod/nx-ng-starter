import { Module, Provider } from '@nestjs/common';

import { AuthUtilsModule } from '../auth-utils/auth-utils.module';
import { AuthUtilsService } from '../auth-utils/service/auth-utils.service';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';

export const authModuleProviders: Provider[] = [AuthService, AuthUtilsService];

@Module({
  imports: [AuthUtilsModule],
  exports: [AuthUtilsModule],
  controllers: [AuthController],
  providers: [...authModuleProviders],
})
export class AuthModule {}
