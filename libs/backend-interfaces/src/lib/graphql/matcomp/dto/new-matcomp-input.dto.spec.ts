import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Args, GraphQLSchemaBuilderModule, GraphQLSchemaFactory, Mutation, Resolver } from '@nestjs/graphql';
import { GraphQLFieldConfig, GraphQLSchema } from 'graphql';

import { AppMatcomp } from '../matcomp.interface';
import { AppMatcompModel } from '../model/matcomp.model';
import { AppMatcompInputDto } from './new-matcomp-input.dto';

@Resolver(() => AppMatcompModel)
class AppTestResolver {
  @Mutation(() => AppMatcompModel)
  public async create(@Args('input') args: AppMatcompInputDto) {
    return new AppMatcomp({ ...args });
  }
}

describe('AppMatcompInputDto', () => {
  let app: INestApplication;
  let gqlSchemaFactory: GraphQLSchemaFactory;
  let schema: GraphQLSchema;

  beforeAll(async () => {
    app = await NestFactory.create(GraphQLSchemaBuilderModule);
    await app.init();

    gqlSchemaFactory = app.get(GraphQLSchemaFactory);
    schema = await gqlSchemaFactory.create([AppTestResolver], [], { skipCheck: true });
  });

  afterAll(async () => {
    await app.close();
  });

  it('should have expected model', () => {
    const type = schema.getType('AppMatcompInputDto');
    expect(type).toBeDefined();
    if (typeof type !== 'undefined') {
      const conf = type.toConfig();
      expect(conf.name).toEqual('AppMatcompInputDto');

      const fields = (<typeof conf & { fields: Record<keyof AppMatcompInputDto, GraphQLFieldConfig<AppTestResolver, AppMatcompModel>> }>(
        conf
      )).fields;
      expect(fields.name).toBeDefined();
      expect(fields.description).toBeDefined();
    }
  });

  it('should initialize class properties as expected', () => {
    const model = new AppMatcompInputDto();
    expect(model.name).toEqual('');
    expect(model.description).toEqual('');
  });
});
