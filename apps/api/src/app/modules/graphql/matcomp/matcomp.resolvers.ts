import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { Matcomp, MatcompArgs, MatcompModel, MatcompSubscription, NewMatcompInputDto } from '@nx-ng-starter/api-interface';
import { PubSub } from 'apollo-server-express';
import { MatcompGuard } from './guard/matcomp.guard';
import { MatcompService } from './matcomp.service';

const pubSub = new PubSub();

@Resolver(_ => MatcompModel)
export class MatcompResolvers {
  constructor(private readonly service: MatcompService) {}

  @Query(_ => [MatcompModel])
  @UseGuards(MatcompGuard)
  public async matcomps(@Args() matcompArgs: MatcompArgs) {
    return this.service.findAll(matcompArgs);
  }

  @Query(_ => MatcompModel)
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
  public async create(@Args('createMatcompInput') args: NewMatcompInputDto): Promise<Matcomp> {
    const createdMatcomp = this.service.create(args);
    const matcompSubscription: MatcompSubscription = new MatcompSubscription(createdMatcomp);
    pubSub.publish('matcompCreated', matcompSubscription);
    return createdMatcomp;
  }

  @Subscription(_ => MatcompModel)
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

  @Subscription(_ => MatcompModel)
  public matcompRemoved() {
    return pubSub.asyncIterator('matcompRemoved');
  }
}
