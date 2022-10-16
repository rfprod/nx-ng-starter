import { ContextType, ExecutionContext, Type } from '@nestjs/common';
import { HttpArgumentsHost, RpcArgumentsHost, WsArgumentsHost } from '@nestjs/common/interfaces';
import { Test, TestingModule } from '@nestjs/testing';

import { AppMatcompGuard } from './matcomp.guard';

describe('AppMatcompGuard', () => {
  let testingModule: TestingModule;
  let guard: AppMatcompGuard;

  beforeEach(async () => {
    await Test.createTestingModule({
      providers: [AppMatcompGuard],
    })
      .compile()
      .then(module => {
        testingModule = module;
        guard = testingModule.get<AppMatcompGuard>(AppMatcompGuard);
      });
  });

  it('canActivate should work as expected', () => {
    const context: ExecutionContext = {
      getClass: <T>() =>
        function (...args: unknown[]) {
          return <T>{};
        } as unknown as Type<T>,
      getHandler: () =>
        function () {
          return {};
        },
      getArgs: <T>() => [] as unknown as T,
      getArgByIndex: <T>() => void 0 as unknown as T,
      switchToRpc: function (): RpcArgumentsHost {
        throw new Error('Function not implemented.');
      },
      switchToHttp: function (): HttpArgumentsHost {
        throw new Error('Function not implemented.');
      },
      switchToWs: function (): WsArgumentsHost {
        throw new Error('Function not implemented.');
      },
      getType: function <TypeContext extends string = ContextType>(): TypeContext {
        return <TypeContext>'type';
      },
    };
    expect(guard.canActivate(context)).toEqual(true);
  });
});
