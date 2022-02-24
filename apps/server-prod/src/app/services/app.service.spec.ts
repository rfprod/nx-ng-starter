import { Test, TestingModule } from '@nestjs/testing';

import { APP_ENVIRONMENT, IServerProdEnvironment, testingEnvironmentProvider } from '../providers/environment.provider';
import { AppService } from './app.service';

describe('AppService', () => {
  let app: TestingModule;
  let service: AppService;
  let env: IServerProdEnvironment;

  beforeAll(async () => {
    await Test.createTestingModule({
      providers: [AppService, testingEnvironmentProvider],
    })
      .compile()
      .then(module => {
        app = module;
        service = app.get<AppService>(AppService);
        env = app.get<IServerProdEnvironment>(APP_ENVIRONMENT);
      });
  });

  it('clientIndexPath should read file and return a string', () => {
    const devDilePath = service.clientIndexPath();
    expect(devDilePath.includes('/dist/apps/client/index.html')).toBeTruthy();

    env.production = true;
    const prodFilePath = service.clientIndexPath();
    expect(prodFilePath.includes('/assets/index.html')).toBeTruthy();
  });

  it('getClientIndex should read file and return a string', () => {
    const file = service.getClientIndex();
    expect(file).toEqual(expect.any(String));
  });
});
