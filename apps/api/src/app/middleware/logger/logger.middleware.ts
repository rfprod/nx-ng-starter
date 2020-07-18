import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * Logger middleware.
 */
@Injectable()
export class ApiLoggerMiddleware implements NestMiddleware {
  public use(req: Request, res: Response, next: () => unknown) {
    // eslint-disable-next-line no-console
    console.log('req', req.originalUrl);
    next();
  }
}
