import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Args, GraphQLSchemaBuilderModule, GraphQLSchemaFactory, Mutation, Resolver } from '@nestjs/graphql';
import { GraphQLFieldConfig, GraphQLSchema } from 'graphql';

import { AppMatcompModel } from '../../matcomp/model/matcomp.model';
import { AppFileUploadInputDto } from './file-upload-input.dto';

@Resolver(() => AppMatcompModel)
class AppTestResolver {
  @Mutation(() => String)
  public async upload(@Args('input') args: AppFileUploadInputDto) {
    return args.filename;
  }
}

describe('AppFileUploadInputDto', () => {
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
    const type = schema.getType('AppFileUploadInputDto');
    expect(type).toBeDefined();
    if (typeof type !== 'undefined') {
      const conf = type.toConfig();
      expect(conf.name).toEqual('AppFileUploadInputDto');

      const fields = (<typeof conf & { fields: Record<keyof AppFileUploadInputDto, GraphQLFieldConfig<AppTestResolver, AppMatcompModel>> }>(
        conf
      )).fields;
      expect(fields.filename).toBeDefined();
      expect(fields.mimetype).toBeDefined();
      expect(fields.encoding).toBeDefined();
    }
  });

  it('should initialize class properties as expected', () => {
    const model = new AppFileUploadInputDto();
    expect(model.filename).toEqual('');
    expect(model.mimetype).toEqual('');
    expect(model.encoding).toEqual('');
  });
});
