import { Injectable } from '@angular/core';
import { HammerGestureConfig } from '@angular/platform-browser';

/**
 * HammerJS Gesture Config.
 * Documentation reference: https://hammerjs.github.io/
 */
@Injectable()
export class AppHammerGestureConfig extends HammerGestureConfig {
  public readonly overrides: {
    [key: string]: Record<string, unknown>;
  } = {
    pan: {
      enable: false,
      pointers: 0, // Required pointers. 0 for all pointers.
      threshold: 10, // Minimal pan distance required before recognizing.
    },
    pinch: {
      enable: false,
      pointers: 2, // Required pointers, with a minimal of 2.
      threshold: 0, // Minimal scale before recognizing.
    },
    press: {
      enable: false,
      pointers: 1, // Required pointers.
      threshold: 9, // Minimal movement that is allowed while pressing.
      time: 251, // Minimal press time in ms.
    },
    tap: {
      enable: false,
      pointers: 1, // Required pointers.
      taps: 1, // Amount of taps required.
      interval: 300, // Maximum time in ms between multiple taps.
      time: 250, // Maximum press time in ms.
      threshold: 2, // While doing a tap some small movement is allowed.
      posThreshold: 10, // The maximum position difference between multiple taps.
    },
    rotate: {
      enable: false,
      pointers: 2, // Required pointers, with a minimal of 2.
      threshold: 0, // Minimal rotation before recognizing.
    },
    swipe: {
      enable: true,
      pointers: 1, // Required pointers.
      velocity: 0.8, // inimal velocity required before recognizing, unit is in px per ms.
      threshold: 80, // Minimal distance required before recognizing.
    },
  };
}
