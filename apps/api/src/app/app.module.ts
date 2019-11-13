import { Module } from '@nestjs/common';

import { AuthModule } from './modules/auth/auth.module';

import { GqlApiModule } from './modules/graphql/graphql-api.module';

import { environment } from '../environments/environment';

@Module({
  imports: [
    AuthModule,
    GqlApiModule.forRoot(environment),
  ],
})
export class AppModule {}
