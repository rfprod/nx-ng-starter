import { Test, TestingModule } from '@nestjs/testing';

import { API_ENV, apiAppEnvProvider, AppApiEnvironment, defaultWsPort } from './api-environment';

describe('AppApiEnvironment', () => {
  it('should initialize class properties as expected', () => {
    const raw = new AppApiEnvironment();
    expect(raw.appName).toEqual('Nx Ng Starter API');
    expect(raw.envoyUrl).toEqual('http://localhost:8081');
    expect(raw.firebase).toBeFalsy();
    expect(raw.production).toBeFalsy();
    expect(raw.wsPort).toEqual(defaultWsPort);

    const initializer: AppApiEnvironment = {
      appName: 'test',
      envoyUrl: 'test',
      firebase: true,
      production: true,
      wsPort: 0,
    };
    const initialized = new AppApiEnvironment(initializer);
    expect(initialized.appName).toEqual(initializer.appName);
    expect(initialized.envoyUrl).toEqual(initializer.envoyUrl);
    expect(initialized.firebase).toEqual(initializer.firebase);
    expect(initialized.production).toEqual(initializer.production);
    expect(initialized.wsPort).toEqual(initializer.wsPort);
  });
});

describe('apiAppEnvProvider', () => {
  let testingModule: TestingModule;
  let environment: AppApiEnvironment;

  beforeAll(async () => {
    await Test.createTestingModule({
      providers: [apiAppEnvProvider],
    })
      .compile()
      .then(module => {
        testingModule = module;
        environment = testingModule.get<AppApiEnvironment>(API_ENV);
      });
  });

  it('should provide as expected', () => {
    const raw = new AppApiEnvironment();
    expect(environment.appName).toEqual(raw.appName);
    expect(environment.envoyUrl).toEqual(raw.envoyUrl);
    expect(environment.firebase).toEqual(raw.firebase);
    expect(environment.production).toEqual(raw.production);
    expect(environment.wsPort).toEqual(raw.wsPort);
  });
});
