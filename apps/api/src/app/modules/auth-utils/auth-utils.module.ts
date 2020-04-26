import { Module } from '@nestjs/common';

import { AuthUtilsService } from './service/auth-utils.service';

@Module({
  providers: [AuthUtilsService],
})
export class AuthUtilsModule {}
