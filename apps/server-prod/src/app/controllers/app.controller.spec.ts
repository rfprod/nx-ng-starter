import { Test, TestingModule } from '@nestjs/testing';

import { testingEnvironmentProvider } from '../providers/environment.provider';
import { AppService } from '../services/app.service';
import { AppController } from './app.controller';

describe('AppController', () => {
  let app: TestingModule;
  let controller: AppController;
  let service: AppService;

  beforeAll(async () => {
    await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, testingEnvironmentProvider],
    })
      .compile()
      .then(module => {
        app = module;
        controller = app.get<AppController>(AppController);
        service = app.get<AppService>(AppService);
      });
  });

  it('getClientIndex should call a respective service method', () => {
    const spy = jest.spyOn(service, 'getClientIndex').mockImplementation(() => 'test');
    controller.getClientIndex();
    expect(spy).toHaveBeenCalled();
  });
});
