import { Test, TestingModule } from '@nestjs/testing';
import { Request, request, Response, response } from 'express';

import { AppLoggerMiddleware } from './logger.middleware';

describe('AppLoggerMiddleware', () => {
  let testingModule: TestingModule;
  let middleware: AppLoggerMiddleware;

  beforeAll(async () => {
    await Test.createTestingModule({
      providers: [AppLoggerMiddleware],
    })
      .compile()
      .then(module => {
        testingModule = module;
        middleware = testingModule.get<AppLoggerMiddleware>(AppLoggerMiddleware);
      });
  });

  it('the middleware should log an original request url', () => {
    const middlewareParams: {
      req: Request;
      res: Response;
      next: () => unknown;
    } = {
      req: request,
      res: response,
      next: () => void 0,
    };
    middlewareParams.req.originalUrl = 'test';
    const nextHandleSpy = jest.spyOn(middlewareParams, 'next');
    const consoleLogSpy = jest.spyOn(console, 'log');
    middleware.use(middlewareParams.req, middlewareParams.res, middlewareParams.next);
    expect(consoleLogSpy).toHaveBeenCalledWith('req', middlewareParams.req.originalUrl);
    expect(nextHandleSpy).toHaveBeenCalled();
  });
});
