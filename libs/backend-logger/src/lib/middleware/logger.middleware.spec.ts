import { Test, type TestingModule } from '@nestjs/testing';
import { type Request, request, type Response, response } from 'express';

import { AppLoggerMiddleware } from './logger.middleware';

describe('AppLoggerMiddleware', () => {
  let testingModule: TestingModule;
  let middleware: AppLoggerMiddleware;

  beforeAll(async () => {
    testingModule = await Test.createTestingModule({
      providers: [AppLoggerMiddleware],
    }).compile();
    middleware = testingModule.get<AppLoggerMiddleware>(AppLoggerMiddleware);
  });

  it('the middleware should log an original request url', () => {
    const middlewareParams: {
      req: Request;
      res: Response;
      next(): unknown;
    } = {
      req: request,
      res: response,
      next: () => void 0,
    };
    middlewareParams.req.originalUrl = 'test';
    const nextHandleSpy = vi.spyOn(middlewareParams, 'next');
    const stdoutWriteSpy = vi.spyOn(process.stdout, 'write');
    middleware.use(middlewareParams.req, middlewareParams.res, middlewareParams.next);
    expect(stdoutWriteSpy).toHaveBeenCalledWith(`\nreq: ${middlewareParams.req.originalUrl}\n`);
    expect(nextHandleSpy).toHaveBeenCalled();
  });
});
