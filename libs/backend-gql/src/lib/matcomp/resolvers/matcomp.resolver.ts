import { AppMatcompArgs, AppMatcompInputDto, AppMatcompModel, AppMatcompSubscription } from '@app/backend-interfaces';
import { Inject, NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

import { AppMatcompGuard } from '../guards/matcomp.guard';
import type { TMatcompService } from '../interfaces/matcomp.interface';
import { MATCOMP_SERVICE_TOKEN } from '../services/matcomp.service';

@Resolver(() => AppMatcompModel)
export class AppMatcompResolver {
  constructor(
    @Inject(MATCOMP_SERVICE_TOKEN) private readonly service: TMatcompService,
    @Inject('PUB_SUB') private readonly pubSub: PubSub,
  ) {}

  @Query(() => [AppMatcompModel])
  @UseGuards(AppMatcompGuard)
  public async matcomps(@Args() matcompArgs: AppMatcompArgs) {
    return this.service.findAll(matcompArgs);
  }

  @Query(() => AppMatcompModel)
  @UseGuards(AppMatcompGuard)
  public async matcomp(
    @Args('id')
    id: string,
  ) {
    const matcomp = this.service.findOneById(id);
    if (typeof matcomp === 'undefined') {
      throw new NotFoundException(id);
    }
    return matcomp;
  }

  @Mutation(() => AppMatcompModel)
  @UseGuards(AppMatcompGuard)
  public async create(@Args('input') args: AppMatcompInputDto) {
    const createdMatcomp = this.service.create(args);
    const matcompSubscription: AppMatcompSubscription = new AppMatcompSubscription({ matcomp: createdMatcomp });
    void this.pubSub.publish('matcompCreated', matcompSubscription);
    return createdMatcomp;
  }

  @Subscription(() => AppMatcompModel)
  @UseGuards(AppMatcompGuard)
  public matcompCreated() {
    return this.pubSub.asyncIterator('matcompCreated');
  }

  @Mutation(() => AppMatcompModel)
  @UseGuards(AppMatcompGuard)
  public async remove(@Args('id') id: string) {
    const removedMatcomp = this.service.remove(id);
    const matcompSubscription: AppMatcompSubscription = new AppMatcompSubscription({ matcomp: removedMatcomp });
    void this.pubSub.publish('matcompRemoved', matcompSubscription);
    return removedMatcomp;
  }

  @Subscription(() => AppMatcompModel)
  @UseGuards(AppMatcompGuard)
  public matcompRemoved() {
    return this.pubSub.asyncIterator('matcompRemoved');
  }
}
