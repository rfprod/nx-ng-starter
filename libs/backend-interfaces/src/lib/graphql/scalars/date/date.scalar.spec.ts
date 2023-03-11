import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Field, GraphQLSchemaBuilderModule, GraphQLSchemaFactory, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { ASTNode, GraphQLSchema, Kind } from 'graphql';

import { AppDateScalar } from './date.scalar';

@ObjectType('AppModel', { isAbstract: true })
export class AppModel {
  @Field(() => Date, {
    defaultValue: new Date(),
  })
  public created?: number;
}

@Resolver(() => AppModel)
class AppTestResolver {
  @Query(() => [AppModel])
  public async date() {
    return new AppModel();
  }
}

describe('AppDateScalar', () => {
  let app: INestApplication;
  let gqlSchemaFactory: GraphQLSchemaFactory;
  let schema: GraphQLSchema;

  beforeAll(async () => {
    app = await NestFactory.create(GraphQLSchemaBuilderModule);
    await app.init();

    gqlSchemaFactory = app.get(GraphQLSchemaFactory);
    schema = await gqlSchemaFactory.create([AppTestResolver], [AppDateScalar], { skipCheck: true });
  });

  afterAll(async () => {
    await app.close();
  });

  it('should have expected model', () => {
    const type = schema.getType('Date');
    expect(type).toBeDefined();
    if (typeof type !== 'undefined') {
      const conf = type.toConfig();
      expect(conf.name).toEqual('Date');
      const fields = <typeof conf & AppDateScalar>conf;
      expect(fields.description).toBeDefined();
      expect(fields.parseLiteral).toBeDefined();
      expect(fields.parseValue).toBeDefined();
      expect(fields.serialize).toBeDefined();
    }
  });

  it('should initialize class properties as expected', () => {
    const model = new AppDateScalar();
    expect(model.description).toEqual('Date custom scalar type');
  });

  it('should have parseValue method that works as expected', () => {
    const model = new AppDateScalar();
    const date = new Date();
    expect(model.parseValue(date.getTime())).toEqual(date);
    expect(model.parseValue('')).toEqual(expect.any(Date));
  });

  it('should have parseValue method that works as expected', () => {
    const model = new AppDateScalar();
    const date = new Date();
    const astNode = {
      kind: Kind.INT,
      value: date.getTime(),
    };
    expect(model.parseLiteral(astNode as ASTNode)).toEqual(date);
    expect(model.parseLiteral({} as ASTNode)).toEqual(expect.any(Date));
  });

  it('should have parseValue method that works as expected', () => {
    const model = new AppDateScalar();
    const date = new Date();
    expect(model.serialize(date)).toEqual(date.getTime());
    expect(model.serialize(void 0)).toEqual(0);
  });
});
