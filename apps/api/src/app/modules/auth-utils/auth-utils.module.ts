import { Module } from '@nestjs/common';

import { ApiAuthUtilsService } from './service/auth-utils.service';

@Module({
  providers: [ApiAuthUtilsService],
})
export class ApiAuthUtilsModule {}
