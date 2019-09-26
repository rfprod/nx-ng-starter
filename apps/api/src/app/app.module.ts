import { Module } from '@nestjs/common';

import { GraphQLModule } from '@nestjs/graphql';

import { DateScalar } from './common/scalars/date.scalar';
import { AuthModule } from './modules/auth/auth.module';
import { MatcompModule } from './modules/matcomp/matcomp.module';

import { environment } from '../environments/environment';

@Module({
  imports: [
    GraphQLModule.forRoot({
      include: [MatcompModule],
      debug: environment.production ? false : true,
      playground: environment.production ? false : true,
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
    }),
    AuthModule,
    MatcompModule,
  ],
  providers: [DateScalar],
})
export class AppModule {}
