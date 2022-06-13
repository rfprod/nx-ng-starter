import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { GraphQLSchemaBuilderModule, GraphQLSchemaFactory, Query, Resolver } from '@nestjs/graphql';
import { GraphQLFieldConfig, GraphQLSchema } from 'graphql';

import { AppMatcompModel } from './matcomp.model';

@Resolver(() => AppMatcompModel)
class AppTestResolver {
  @Query(() => [AppMatcompModel])
  public async matcomp() {
    return new AppMatcompModel();
  }
}

describe('AppMatcompModel', () => {
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
    const type = schema.getType('AppMatcompModel');
    expect(type).toBeDefined();
    if (typeof type !== 'undefined') {
      const conf = type.toConfig();
      expect(conf.name).toEqual('AppMatcompModel');
      const fields = (<typeof conf & { fields: Record<keyof AppMatcompModel, GraphQLFieldConfig<AppTestResolver, AppMatcompModel>> }>conf)
        .fields;
      expect(fields.id).toBeDefined();
      expect(fields.name).toBeDefined();
      expect(fields.description).toBeDefined();
      expect(fields.creationDate).toBeDefined();
    }
  });

  it('should initialize class properties as expected', () => {
    const model = new AppMatcompModel();
    expect(model.id).toEqual('');
    expect(model.name).toEqual('');
    expect(model.description).toEqual('');
    expect(model.creationDate).toBeUndefined();
  });
});
