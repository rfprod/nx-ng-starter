import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Args, GraphQLSchemaBuilderModule, GraphQLSchemaFactory, Query, Resolver } from '@nestjs/graphql';
import { GraphQLArgumentConfig, GraphQLFieldConfig, GraphQLSchema } from 'graphql';

import { AppMatcomp } from '../matcomp.interface';
import { AppMatcompModel } from '../model/matcomp.model';
import { AppMatcompArgs, defaultSkipValue, defaultTakeValue } from './matcomp.args';

@Resolver(() => AppMatcompModel)
class AppTestResolver {
  @Query(() => [AppMatcompModel])
  public async matcomps(@Args() matcompArgs: AppMatcompArgs) {
    const matcomp = (id = '0') => new AppMatcomp({ id, name: 'test', description: 'test', creationDate: new Date().getTime() });
    const matcomps = [matcomp(), matcomp('1'), matcomp('2')];
    return matcomps.slice(matcompArgs.skip, matcompArgs.take);
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
    schema = await gqlSchemaFactory.create([AppTestResolver], [AppMatcompArgs], { skipCheck: true });
  });

  afterAll(async () => {
    await app.close();
  });

  it('should have expected model', () => {
    const type = schema.getQueryType();
    expect(type).toBeDefined();
    if (typeof type !== 'undefined' && type !== null) {
      const conf = type.toConfig();
      expect(conf.name).toEqual('Query');
      const fields = (<typeof conf & { fields: { matcomps: GraphQLFieldConfig<AppTestResolver, AppMatcompModel> } }>conf).fields;
      expect(fields.matcomps).toBeDefined();
      expect(fields.matcomps.args).toBeDefined();
      const args = <{ skip: GraphQLArgumentConfig; take: GraphQLArgumentConfig }>fields.matcomps.args;
      expect(args.skip.defaultValue).toEqual(defaultSkipValue);
      expect(args.take.defaultValue).toEqual(defaultTakeValue);
    }
  });

  it('should initialize class properties as expected', () => {
    const model = new AppMatcompArgs();
    expect(model.skip).toEqual(defaultSkipValue);
    expect(model.take).toEqual(defaultTakeValue);
  });
});
