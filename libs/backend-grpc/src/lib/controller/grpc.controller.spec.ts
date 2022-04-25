import { nxngstarter } from '@app/proto';
import { Test, TestingModule } from '@nestjs/testing';
import { first, tap } from 'rxjs/operators';

import { NXNGSTARTER_PACKAGE } from '../grpc-client.options';
import { AppGrpcController } from './grpc.controller';

describe('AppGrpcController', () => {
  let app: TestingModule;
  const clientPackageMockData = {
    findOne: nxngstarter.Entity.toObject(new nxngstarter.Entity(), {
      defaults: true,
    }),
    findMany: [],
  };

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppGrpcController],
      providers: [
        {
          provide: NXNGSTARTER_PACKAGE,
          useValue: {
            findOne: () => ({ ...clientPackageMockData.findOne }),
            finaMany: () => [],
          },
        },
      ],
    }).compile();
  });

  it('getOne should return one item', async () => {
    const appController = app.get<AppGrpcController>(AppGrpcController);
    const promise = new Promise<void>((resolve, reject) => {
      void appController
        .getById('id1')
        .pipe(
          first(),
          tap(result => {
            expect(result).toEqual(clientPackageMockData.findOne);
            resolve();
          }),
        )
        .subscribe();
    });
    await promise;
  });

  it('getMany should return items length = 0', async () => {
    const appController = app.get<AppGrpcController>(AppGrpcController);
    const promise = new Promise<void>((resolve, reject) => {
      void appController
        .getMany()
        .pipe(
          first(),
          tap(result => {
            expect(result.length).toEqual(clientPackageMockData.findMany.length);
            resolve();
          }),
        )
        .subscribe();
    });
    await promise;
  });
});
