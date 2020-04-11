import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * Logger middleware.
 */
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  public use(req: Request, res: Response, next: () => any) {
    console.log('req', req.originalUrl);
    next();
  }
}
