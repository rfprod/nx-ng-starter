import { TestBed, type TestModuleMetadata } from '@angular/core/testing';
import type { HammerGestureConfig } from '@angular/platform-browser';

import { AppHammerGestureConfig } from './hammerjs-gesture.config';

describe('AppHammerGestureConfig', () => {
  const testBedConfig: TestModuleMetadata = {
    providers: [AppHammerGestureConfig],
  };

  let hammerGestureConfig: HammerGestureConfig;

  beforeEach(async () => {
    await TestBed.configureTestingModule(testBedConfig).compileComponents();
    hammerGestureConfig = TestBed.inject(AppHammerGestureConfig);
  });

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
        velocity: 0.8,
        threshold: 80,
      },
    };
    expect(hammerGestureConfig.overrides).toMatchObject(expectedOverrides);
  });
});
