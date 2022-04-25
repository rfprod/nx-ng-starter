import { AppMatcompArgs, AppMatcompInputDto, AppMatcompModel, AppMatcompSubscription } from '@app/backend-interfaces';
import { Inject, NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

import { AppMatcompGuard } from './matcomp.guard';
import { AppMatcompService } from './matcomp.service';

@Resolver(() => AppMatcompModel)
export class AppMatcompResolver {
  constructor(private readonly service: AppMatcompService, @Inject('PUB_SUB') private readonly pubSub: PubSub) {}

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
    const matcompSubscription: AppMatcompSubscription = new AppMatcompSubscription(createdMatcomp);
    void this.pubSub.publish('matcompCreated', matcompSubscription);
    return createdMatcomp;
  }

  @Subscription(() => AppMatcompModel)
  @UseGuards(AppMatcompGuard)
  public matcompCreated() {
    return this.pubSub.asyncIterator('matcompCreated');
  }

  @Mutation(() => Boolean)
  @UseGuards(AppMatcompGuard)
  public async remove(@Args('id') id: string) {
    const removedMatcomp = this.service.remove(id);
    const matcompSubscription: AppMatcompSubscription = new AppMatcompSubscription(removedMatcomp);
    void this.pubSub.publish('matcompRemoved', matcompSubscription);
    return Boolean(removedMatcomp);
  }

  @Subscription(() => AppMatcompModel)
  @UseGuards(AppMatcompGuard)
  public matcompRemoved() {
    return this.pubSub.asyncIterator('matcompRemoved');
  }
}
