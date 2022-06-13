import { CustomScalar, Scalar } from '@nestjs/graphql';
import { ASTNode, Kind } from 'graphql';

@Scalar('Date', () => Date)
export class AppDateScalar implements CustomScalar<number, Date> {
  public description = 'Date custom scalar type';

  public parseValue(value: number | unknown): Date {
    return typeof value === 'number' ? new Date(value) : new Date();
  }

  public parseLiteral(ast: ASTNode): Date {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value);
    }
    return new Date();
  }

  public serialize(value: Date | unknown): number {
    return value instanceof Date ? value.getTime() : 0;
  }
}
