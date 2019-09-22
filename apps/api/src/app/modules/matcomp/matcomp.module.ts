import { Module } from '@nestjs/common';

import { DateScalar } from '../../common/scalars/date.scalar';

import { MatcompResolvers } from './resolver/matcomp.resolvers';

import { MatcompService } from './service/matcomp.service';

@Module({
  providers: [
    MatcompService,
    MatcompResolvers,
    DateScalar,
  ],
})
export class MatcompModule {}
