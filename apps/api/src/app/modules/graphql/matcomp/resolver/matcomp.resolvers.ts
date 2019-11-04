import { NotFoundException, UseGuards } from '@nestjs/common';

import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';

import { PubSub } from 'apollo-server-express';

import { NewMatcompInput } from '../dto/new-matcomp.input';

import { MatcompGuard } from '../guard/matcomp.guard';

import { MatcompArgs } from '../dto/matcomp.args';

import { Matcomp } from '../model/matcomp.model';

import { MatcompService } from '../service/matcomp.service';

import { MatcompSubscription } from '../interface/matcomp-subscription.interface';

const pubSub = new PubSub();

@Resolver(_ => Matcomp)
export class MatcompResolvers {
  constructor(private readonly service: MatcompService) {}

  @Query(_ => [Matcomp])
  @UseGuards(MatcompGuard)
  public async matcomps(@Args() matcompArgs: MatcompArgs) {
    return this.service.findAll(matcompArgs);
  }

  @Query(_ => Matcomp)
  public async matcomp(
    @Args('id')
    id: string,
  ): Promise<Matcomp> {
    const matcomp = this.service.findOneById(id);
    if (!matcomp) {
      throw new NotFoundException(id);
    }
    return matcomp;
  }

  @Mutation(_ => Matcomp)
  public async create(@Args('createMatcompInput') args: NewMatcompInput): Promise<Matcomp> {
    const createdMatcomp = this.service.create(args);
    const matcompSubscription: MatcompSubscription = new MatcompSubscription(createdMatcomp);
    pubSub.publish('matcompCreated', matcompSubscription);
    return createdMatcomp;
  }

  @Subscription(_ => Matcomp)
  public matcompCreated() {
    return pubSub.asyncIterator('matcompCreated');
  }

  @Mutation(_ => Boolean)
  public async remove(@Args('id') id: string) {
    const removedMatcomp = this.service.remove(id);
    const matcompSubscription: MatcompSubscription = new MatcompSubscription(removedMatcomp);
    pubSub.publish('matcompRemoved', matcompSubscription);
    return removedMatcomp;
  }

  @Subscription(_ => Matcomp)
  public matcompRemoved() {
    return pubSub.asyncIterator('matcompRemoved');
  }
}
