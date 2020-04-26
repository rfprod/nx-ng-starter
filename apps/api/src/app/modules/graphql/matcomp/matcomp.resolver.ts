import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import {
  MatcompArgs,
  MatcompModel,
  MatcompSubscription,
  NewMatcompInputDto,
} from '@nx-ng-starter/api-interface';
import { PubSub } from 'apollo-server-express';

import { MatcompGuard } from './guard/matcomp.guard';
import { MatcompService } from './matcomp.service';

const pubSub = new PubSub();

@Resolver(() => MatcompModel)
export class MatcompResolver {
  constructor(private readonly service: MatcompService) {}

  @Query(() => [MatcompModel])
  @UseGuards(MatcompGuard)
  public async matcomps(@Args() matcompArgs: MatcompArgs) {
    return this.service.findAll(matcompArgs);
  }

  @Query(() => MatcompModel)
  @UseGuards(MatcompGuard)
  public async matcomp(
    @Args('id')
    id: string,
  ) {
    const matcomp = this.service.findOneById(id);
    if (!matcomp) {
      throw new NotFoundException(id);
    }
    return matcomp;
  }

  @Mutation(() => MatcompModel)
  @UseGuards(MatcompGuard)
  public async create(@Args('input') args: NewMatcompInputDto) {
    const createdMatcomp = this.service.create(args);
    const matcompSubscription: MatcompSubscription = new MatcompSubscription(createdMatcomp);
    void pubSub.publish('matcompCreated', matcompSubscription);
    return createdMatcomp;
  }

  @Subscription(() => MatcompModel)
  @UseGuards(MatcompGuard)
  public matcompCreated() {
    return pubSub.asyncIterator('matcompCreated');
  }

  @Mutation(() => Boolean)
  @UseGuards(MatcompGuard)
  public async remove(@Args('id') id: string) {
    const removedMatcomp = this.service.remove(id);
    const matcompSubscription: MatcompSubscription = new MatcompSubscription(removedMatcomp);
    void pubSub.publish('matcompRemoved', matcompSubscription);
    return Boolean(removedMatcomp);
  }

  @Subscription(() => MatcompModel)
  @UseGuards(MatcompGuard)
  public matcompRemoved() {
    return pubSub.asyncIterator('matcompRemoved');
  }
}
