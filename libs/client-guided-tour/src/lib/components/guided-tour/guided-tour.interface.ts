import type { ConnectedPosition } from '@angular/cdk/overlay';
import { InjectionToken, type Provider } from '@angular/core';

/** Guided tour step data. */
export interface IGuidedTourData {
  index: number;
  title: string;
  subtitle: string;
  description: string;
  first: boolean;
  last: boolean;
}

/** Guided tour step data injection token. */
export const GUIDED_TOUR_DATA = new InjectionToken<IGuidedTourData>('GUIDED_TOUR_DATA');

/** Guided tour step data provider. */
export const guidedTourDataProvider: Provider = {
  provide: GUIDED_TOUR_DATA,
  useValue: {
    index: 0,
    title: '',
    subtitle: '',
    description: '',
    first: true,
    last: true,
  } as IGuidedTourData,
};

/**
 * Guided tour directive interface.
 */
export interface IGuidedTourDirective {
  appGuidedTour?: IGuidedTourData;
  highlightElement: boolean;
  flexibleConnectedPositions: ConnectedPosition[];
  scrollStrategy: 'block' | 'close' | 'noop' | 'reposition';
  dispose(): void;
  display(): void;
}
