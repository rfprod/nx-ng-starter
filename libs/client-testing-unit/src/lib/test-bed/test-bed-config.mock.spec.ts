import { CUSTOM_ELEMENTS_SCHEMA, InjectionToken } from '@angular/core';
import { TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';

import { AppMocksCoreModule } from '../testing-unit.module';
import { getTestBedConfig, newTestBedMetadata } from './test-bed-config.mock';

const TEST_TOKEN = new InjectionToken<string>('TEST');

describe('newTestBedMetadata', () => {
  let provider: string;

  it('should create the default config without any params', () => {
    const testBedConfig: TestModuleMetadata = newTestBedMetadata();
    expect(testBedConfig.declarations).toEqual([]);
    expect(testBedConfig.imports).toEqual([]);
    expect(testBedConfig.schemas).toEqual([]);
    expect(testBedConfig.providers).toEqual([]);
    expect(testBedConfig.teardown).toEqual({ destroyAfterEach: true });
  });

  it('should create the default config with partial params', () => {
    let testBedConfig: TestModuleMetadata = newTestBedMetadata({ imports: [] });
    expect(testBedConfig.declarations).toEqual([]);
    expect(testBedConfig.imports).toEqual([]);
    expect(testBedConfig.schemas).toEqual([]);
    expect(testBedConfig.providers).toEqual([]);
    expect(testBedConfig.teardown).toEqual({ destroyAfterEach: true });

    testBedConfig = newTestBedMetadata({ declarations: [] });
    expect(testBedConfig.declarations).toEqual([]);
    expect(testBedConfig.imports).toEqual([]);
    expect(testBedConfig.schemas).toEqual([]);
    expect(testBedConfig.providers).toEqual([]);
    expect(testBedConfig.teardown).toEqual({ destroyAfterEach: true });

    testBedConfig = newTestBedMetadata({ schemas: [] });
    expect(testBedConfig.declarations).toEqual([]);
    expect(testBedConfig.imports).toEqual([]);
    expect(testBedConfig.schemas).toEqual([]);
    expect(testBedConfig.providers).toEqual([]);
    expect(testBedConfig.teardown).toEqual({ destroyAfterEach: true });

    testBedConfig = newTestBedMetadata({ providers: [] });
    expect(testBedConfig.declarations).toEqual([]);
    expect(testBedConfig.imports).toEqual([]);
    expect(testBedConfig.schemas).toEqual([]);
    expect(testBedConfig.providers).toEqual([]);
    expect(testBedConfig.teardown).toEqual({ destroyAfterEach: true });

    const testTeardown = { rethrowErrors: false, destroyAfterEach: false };
    testBedConfig = newTestBedMetadata({ teardown: testTeardown });
    expect(testBedConfig.declarations).toEqual([]);
    expect(testBedConfig.imports).toEqual([]);
    expect(testBedConfig.schemas).toEqual([]);
    expect(testBedConfig.providers).toEqual([]);
    expect(testBedConfig.teardown).toEqual(testTeardown);
  });

  it('should create a default empty configuration passing additional parameters', waitForAsync(() => {
    const testValue = 'test';
    const testBedConfig = newTestBedMetadata({
      providers: [
        {
          provide: TEST_TOKEN,
          useValue: testValue,
        },
      ],
    });
    expect(testBedConfig.declarations).toEqual([]);
    expect(testBedConfig.imports).toEqual([]);
    expect(testBedConfig.schemas).toEqual([]);
    expect(testBedConfig.teardown).toEqual({ destroyAfterEach: true });
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        provider = TestBed.inject(TEST_TOKEN);
        expect(provider).toEqual(testValue);
      });
  }));
});

describe('getTestBedConfig', () => {
  let provider: string;

  it('should create the default config without any params', () => {
    const testBedConfig: TestModuleMetadata = getTestBedConfig();
    expect(testBedConfig.declarations).toEqual([]);
    expect(testBedConfig.imports).toEqual([AppMocksCoreModule.forRoot()]);
    expect(testBedConfig.schemas).toEqual([CUSTOM_ELEMENTS_SCHEMA]);
    expect(testBedConfig.providers).toEqual([]);
    expect(testBedConfig.teardown).toEqual({ destroyAfterEach: true });
  });

  it('should create the default config with partial params', () => {
    let testBedConfig: TestModuleMetadata = getTestBedConfig({ imports: [] });
    expect(testBedConfig.declarations).toEqual([]);
    expect(testBedConfig.imports).toEqual([AppMocksCoreModule.forRoot()]);
    expect(testBedConfig.schemas).toEqual([CUSTOM_ELEMENTS_SCHEMA]);
    expect(testBedConfig.providers).toEqual([]);
    expect(testBedConfig.teardown).toEqual({ destroyAfterEach: true });

    testBedConfig = getTestBedConfig({ declarations: [] });
    expect(testBedConfig.declarations).toEqual([]);
    expect(testBedConfig.imports).toEqual([AppMocksCoreModule.forRoot()]);
    expect(testBedConfig.schemas).toEqual([CUSTOM_ELEMENTS_SCHEMA]);
    expect(testBedConfig.providers).toEqual([]);
    expect(testBedConfig.teardown).toEqual({ destroyAfterEach: true });

    testBedConfig = getTestBedConfig({ schemas: [] });
    expect(testBedConfig.declarations).toEqual([]);
    expect(testBedConfig.imports).toEqual([AppMocksCoreModule.forRoot()]);
    expect(testBedConfig.schemas).toEqual([CUSTOM_ELEMENTS_SCHEMA]);
    expect(testBedConfig.providers).toEqual([]);
    expect(testBedConfig.teardown).toEqual({ destroyAfterEach: true });

    testBedConfig = getTestBedConfig({ providers: [] });
    expect(testBedConfig.declarations).toEqual([]);
    expect(testBedConfig.imports).toEqual([AppMocksCoreModule.forRoot()]);
    expect(testBedConfig.schemas).toEqual([CUSTOM_ELEMENTS_SCHEMA]);
    expect(testBedConfig.providers).toEqual([]);
    expect(testBedConfig.teardown).toEqual({ destroyAfterEach: true });

    const testTeardown = { rethrowErrors: false, destroyAfterEach: false };
    testBedConfig = getTestBedConfig({ teardown: testTeardown });
    expect(testBedConfig.declarations).toEqual([]);
    expect(testBedConfig.imports).toEqual([AppMocksCoreModule.forRoot()]);
    expect(testBedConfig.schemas).toEqual([CUSTOM_ELEMENTS_SCHEMA]);
    expect(testBedConfig.providers).toEqual([]);
    expect(testBedConfig.teardown).toEqual(testTeardown);
  });

  it('should be defined should create a default unit testing configuration passing additional parameters', () => {
    const testValue = 'test';
    const testBedConfig: TestModuleMetadata = getTestBedConfig({
      providers: [
        {
          provide: TEST_TOKEN,
          useValue: testValue,
        },
      ],
    });
    expect(testBedConfig.declarations).toEqual([]);
    expect(testBedConfig.imports).toEqual([AppMocksCoreModule.forRoot()]);
    expect(testBedConfig.schemas).toEqual([CUSTOM_ELEMENTS_SCHEMA]);
    expect(testBedConfig.teardown).toEqual({ destroyAfterEach: true });
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        provider = TestBed.inject(TEST_TOKEN);
        expect(provider).toEqual(testValue);
      });
  });
});
