import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  public use(req: Request, res: Response, next: () => unknown) {
    console.log('req', req.originalUrl);
    next();
  }
}
