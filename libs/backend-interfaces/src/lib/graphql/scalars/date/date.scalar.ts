import { CustomScalar, Scalar } from '@nestjs/graphql';
import { ASTNode, Kind } from 'graphql';

@Scalar('Date', () => Date)
export class AppDateScalar implements CustomScalar<number, Date> {
  public description = 'Date custom scalar type';

  /**
   * Value parser.
   * @param value Input value.
   * @returns Parsed value.
   */
  public parseValue(value: number | unknown): Date {
    return typeof value === 'number' ? new Date(value) : new Date();
  }

  /**
   * Literal parser.
   * @param ast AST node.
   * @returns Parsed literal.
   */
  public parseLiteral(ast: ASTNode): Date {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value);
    }
    return new Date();
  }

  /**
   * Value serializer.
   * @param value Input value.
   * @returns Serialized value.
   */
  public serialize(value: Date | unknown): number {
    return value instanceof Date ? value.getTime() : 0;
  }
}
