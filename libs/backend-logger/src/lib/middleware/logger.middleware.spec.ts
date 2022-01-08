import { Test, TestingModule } from '@nestjs/testing';
import { Request, request, Response, response } from 'express';

import { BackendLoggerMiddleware } from './logger.middleware';

describe('BackendLoggerMiddleware', () => {
  let testingModule: TestingModule;
  let middleware: BackendLoggerMiddleware;

  beforeAll(async () => {
    await Test.createTestingModule({
      providers: [BackendLoggerMiddleware],
    })
      .compile()
      .then(module => {
        testingModule = module;
        middleware = testingModule.get<BackendLoggerMiddleware>(BackendLoggerMiddleware);
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
