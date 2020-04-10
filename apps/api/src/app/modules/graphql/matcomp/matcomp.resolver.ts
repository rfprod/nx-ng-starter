import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import {
  Matcomp,
  MatcompArgs,
  MatcompModel,
  MatcompSubscription,
  NewMatcompInputDto,
} from '@nx-ng-starter/api-interface';
import { PubSub } from 'apollo-server-express';
import { MatcompGuard } from './guard/matcomp.guard';
import { MatcompService } from './matcomp.service';

const pubSub = new PubSub();

@Resolver(_ => MatcompModel)
export class MatcompResolver {
  constructor(private readonly service: MatcompService) {}

  @Query(_ => [MatcompModel])
  @UseGuards(MatcompGuard)
  public async matcomps(@Args() matcompArgs: MatcompArgs): Promise<MatcompModel[]> {
    return this.service.findAll(matcompArgs);
  }

  @Query(_ => MatcompModel)
  @UseGuards(MatcompGuard)
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

  @Mutation(_ => MatcompModel)
  @UseGuards(MatcompGuard)
  public async create(@Args('createMatcompInput') args: NewMatcompInputDto): Promise<MatcompModel> {
    const createdMatcomp = this.service.create(args);
    const matcompSubscription: MatcompSubscription = new MatcompSubscription(createdMatcomp);
    pubSub.publish('matcompCreated', matcompSubscription);
    return createdMatcomp;
  }

  @Subscription(_ => MatcompModel)
  @UseGuards(MatcompGuard)
  public matcompCreated() {
    return pubSub.asyncIterator('matcompCreated');
  }

  @Mutation(_ => Boolean)
  @UseGuards(MatcompGuard)
  public async remove(@Args('id') id: string): Promise<MatcompModel> {
    const removedMatcomp = this.service.remove(id);
    const matcompSubscription: MatcompSubscription = new MatcompSubscription(removedMatcomp);
    pubSub.publish('matcompRemoved', matcompSubscription);
    return removedMatcomp;
  }

  @Subscription(_ => MatcompModel)
  @UseGuards(MatcompGuard)
  public matcompRemoved() {
    return pubSub.asyncIterator('matcompRemoved');
  }
}
