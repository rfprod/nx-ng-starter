import { CustomScalar, Scalar } from '@nestjs/graphql';
import { ASTNode, Kind } from 'graphql';

@Scalar('Date', () => Date)
export class DateScalar implements CustomScalar<number, Date> {
  public description = 'Date custom scalar type';

  public parseValue(value: number): Date {
    return new Date(value); // Value from the client
  }

  public serialize(value: Date): number {
    return value.getTime(); // Value sent to the client
  }

  public parseLiteral(ast: ASTNode): Date {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value);
    }
    return new Date();
  }
}
