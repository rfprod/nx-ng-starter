import { Inject, NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import {
  MatcompArgs,
  MatcompModel,
  MatcompSubscription,
  NewMatcompInputDto,
} from '@nx-ng-starter/backend-interfaces';
import { PubSub } from 'graphql-subscriptions';

import { BackendMatcompGuard } from './matcomp.guard';
import { BackendMatcompService } from './matcomp.service';

@Resolver(() => MatcompModel)
export class BackendMatcompResolver {
  constructor(
    private readonly service: BackendMatcompService,
    @Inject('PUB_SUB') private readonly pubSub: PubSub,
  ) {}

  @Query(() => [MatcompModel])
  @UseGuards(BackendMatcompGuard)
  public async matcomps(@Args() matcompArgs: MatcompArgs) {
    return this.service.findAll(matcompArgs);
  }

  @Query(() => MatcompModel)
  @UseGuards(BackendMatcompGuard)
  public async matcomp(
    @Args('id')
    id: string,
  ) {
    const matcomp = this.service.findOneById(id);
    if (!Boolean(matcomp)) {
      throw new NotFoundException(id);
    }
    return matcomp;
  }

  @Mutation(() => MatcompModel)
  @UseGuards(BackendMatcompGuard)
  public async create(@Args('input') args: NewMatcompInputDto) {
    const createdMatcomp = this.service.create(args);
    const matcompSubscription: MatcompSubscription = new MatcompSubscription(createdMatcomp);
    void this.pubSub.publish('matcompCreated', matcompSubscription);
    return createdMatcomp;
  }

  @Subscription(() => MatcompModel)
  @UseGuards(BackendMatcompGuard)
  public matcompCreated() {
    return this.pubSub.asyncIterator('matcompCreated');
  }

  @Mutation(() => Boolean)
  @UseGuards(BackendMatcompGuard)
  public async remove(@Args('id') id: string) {
    const removedMatcomp = this.service.remove(id);
    const matcompSubscription: MatcompSubscription = new MatcompSubscription(removedMatcomp);
    void this.pubSub.publish('matcompRemoved', matcompSubscription);
    return Boolean(removedMatcomp);
  }

  @Subscription(() => MatcompModel)
  @UseGuards(BackendMatcompGuard)
  public matcompRemoved() {
    return this.pubSub.asyncIterator('matcompRemoved');
  }
}
