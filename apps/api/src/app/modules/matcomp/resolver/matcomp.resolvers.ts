import { UseGuards } from '@nestjs/common';

import { NotFoundException } from '@nestjs/common';

import {
  Args,
  Mutation,
  Query,
  Resolver,
  Subscription
} from '@nestjs/graphql';

import { PubSub } from 'apollo-server-express';

import { NewMatcompInput } from '../dto/new-matcomp.input';

import { MatcompGuard } from '../guard/matcomp.guard';

import { MatcompArgs } from '../dto/matcomp.args';

import { Matcomp } from '../model/matcomp.model';

import { MatcompService } from '../service/matcomp.service';
import { MatcompSubscription } from '../interface/matcomp.interface';

const pubSub = new PubSub();

@Resolver(of => Matcomp)
export class MatcompResolvers {

  constructor(
    private readonly service: MatcompService
  ) {}

  @Query(_ => [Matcomp])
  @UseGuards(MatcompGuard)
  public async matcomps(@Args() matcompArgs: MatcompArgs) {
    return await this.service.findAll(matcompArgs);
  }

  @Query(_ => Matcomp)
  public async matcomp(
    @Args('id')
    id: string,
  ): Promise<Matcomp> {
    const matcomp = await this.service.findOneById(id);
    if (!matcomp) {
      throw new NotFoundException(id);
    }
    return matcomp;
  }

  @Mutation(_ => Matcomp)
  public async create(@Args('createMatcompInput') args: NewMatcompInput): Promise<Matcomp> {
    const createdMatcomp = await this.service.create(args);
    pubSub.publish('matcompCreated', { matcompCreated: createdMatcomp } as MatcompSubscription);
    return createdMatcomp;
  }

  @Subscription(_ => Matcomp)
  public matcompCreated() {
    return pubSub.asyncIterator('matcompCreated');
  }

  @Mutation(_ => Boolean)
  async remove(@Args('id') id: string) {
    const removedMatcomp = await this.service.remove(id);
    pubSub.publish('matcompRemoved', { matcompCreated: removedMatcomp } as MatcompSubscription);
    return removedMatcomp;
  }

  @Subscription(_ => Matcomp)
  public matcompRemoved() {
    return pubSub.asyncIterator('matcompRemoved');
  }

}
