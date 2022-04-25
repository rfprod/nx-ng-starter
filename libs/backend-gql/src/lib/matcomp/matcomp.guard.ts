import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AppMatcompGuard implements CanActivate {
  public canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    // TODO: AppMatcompGuard canActivate
    return Boolean(ctx);
  }
}
