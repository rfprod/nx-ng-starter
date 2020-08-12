import { Inject, NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import {
  MatcompArgs,
  MatcompModel,
  MatcompSubscription,
  NewMatcompInputDto,
} from '@nx-ng-starter/api-interface';
import { PubSub } from 'graphql-subscriptions';

import { ApiMatcompGuard } from './matcomp.guard';
import { ApiMatcompService } from './matcomp.service';

@Resolver(() => MatcompModel)
export class ApiMatcompResolver {
  constructor(
    private readonly service: ApiMatcompService,
    @Inject('PUB_SUB') private readonly pubSub: PubSub,
  ) {}

  @Query(() => [MatcompModel])
  @UseGuards(ApiMatcompGuard)
  public async matcomps(@Args() matcompArgs: MatcompArgs) {
    return this.service.findAll(matcompArgs);
  }

  @Query(() => MatcompModel)
  @UseGuards(ApiMatcompGuard)
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
  @UseGuards(ApiMatcompGuard)
  public async create(@Args('input') args: NewMatcompInputDto) {
    const createdMatcomp = this.service.create(args);
    const matcompSubscription: MatcompSubscription = new MatcompSubscription(createdMatcomp);
    void this.pubSub.publish('matcompCreated', matcompSubscription);
    return createdMatcomp;
  }

  @Subscription(() => MatcompModel)
  @UseGuards(ApiMatcompGuard)
  public matcompCreated() {
    return this.pubSub.asyncIterator('matcompCreated');
  }

  @Mutation(() => Boolean)
  @UseGuards(ApiMatcompGuard)
  public async remove(@Args('id') id: string) {
    const removedMatcomp = this.service.remove(id);
    const matcompSubscription: MatcompSubscription = new MatcompSubscription(removedMatcomp);
    void this.pubSub.publish('matcompRemoved', matcompSubscription);
    return Boolean(removedMatcomp);
  }

  @Subscription(() => MatcompModel)
  @UseGuards(ApiMatcompGuard)
  public matcompRemoved() {
    return this.pubSub.asyncIterator('matcompRemoved');
  }
}
