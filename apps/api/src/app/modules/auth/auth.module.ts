import { Module, Provider } from '@nestjs/common';

import { ApiAuthUtilsModule } from '../auth-utils/auth-utils.module';
import { ApiAuthUtilsService } from '../auth-utils/service/auth-utils.service';
import { ApiAuthController } from './controller/auth.controller';
import { ApiAuthService } from './service/auth.service';

export const authModuleProviders: Provider[] = [ApiAuthService, ApiAuthUtilsService];

@Module({
  imports: [ApiAuthUtilsModule],
  exports: [ApiAuthUtilsModule],
  controllers: [ApiAuthController],
  providers: [...authModuleProviders],
})
export class ApiAuthModule {}
