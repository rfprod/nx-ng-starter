import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  public use(req: Request, res: Response, next: () => unknown) {
    process.stdout.write(`\nreq: ${req.originalUrl}\n`);
    next();
  }
}
