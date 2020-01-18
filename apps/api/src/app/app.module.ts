import { Module } from '@nestjs/common';
import { environment } from '../environments/environment';
import { AuthModule } from './modules/auth/auth.module';
import { GqlApiModule } from './modules/graphql/graphql-api.module';

@Module({
  imports: [
    AuthModule,
    GqlApiModule.forRoot(environment),
  ],
})
export class AppModule {}
