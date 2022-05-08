import { TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { HammerGestureConfig } from '@angular/platform-browser';

import { AppHammerGestureConfig } from './hammerjs-gesture.config';

describe('AppHammerGestureConfig', () => {
  const testBedConfig: TestModuleMetadata = {
    providers: [AppHammerGestureConfig],
  };

  let hammerGestureConfig: HammerGestureConfig;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        hammerGestureConfig = TestBed.inject(AppHammerGestureConfig);
      });
  }));

  it('should have expected properties', () => {
    const expectedOverrides = {
      pan: {
        enable: false,
        pointers: 0,
        threshold: 10,
      },
      pinch: {
        enable: false,
        pointers: 2,
        threshold: 0,
      },
      press: {
        enable: false,
        pointers: 1,
        threshold: 9,
        time: 251,
      },
      tap: {
        enable: false,
        pointers: 1,
        taps: 1,
        interval: 300,
        time: 250,
        threshold: 2,
        posThreshold: 10,
      },
      rotate: {
        enable: false,
        pointers: 2,
        threshold: 0,
      },
      swipe: {
        enable: true,
        pointers: 1,
        velocity: 0.4,
        threshold: 20,
      },
    };
    expect(hammerGestureConfig.overrides).toMatchObject(expectedOverrides);
  });
});
