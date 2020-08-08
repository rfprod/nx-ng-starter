import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { ApiAuthUtilsService } from './service/auth-utils.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'jwtsecret', // TODO: should be set from .env
    }),
  ],
  exports: [JwtModule],
  providers: [ApiAuthUtilsService],
})
export class ApiAuthUtilsModule {}
