import { Module } from '@nestjs/common';

import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';

@Module({
  controllers: [
    AuthController
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule {}
