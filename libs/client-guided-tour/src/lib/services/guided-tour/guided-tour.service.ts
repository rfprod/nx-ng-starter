import { Injectable, QueryList } from '@angular/core';

import { AppGuidedTourDirective } from '../../components/guided-tour/guided-tour.directive';

/**
 * @title Guided tour service.
 * @description This service should be injected once for each tour. Use component `providers` array to declare.
 */
@Injectable({
  providedIn: 'any',
})
export class AppGuidedTourService {
  /** Guider tour steps. */
  private steps: AppGuidedTourDirective[] = [];

  /** Guided tour step configuration. */
  public set configuration(stepsQuery: QueryList<AppGuidedTourDirective>) {
    this.steps = stepsQuery.toArray().sort((x, y) => (x.appGuidedTour?.index ?? 0) - (y.appGuidedTour?.index ?? 0));
  }

  /** Active step. */
  public active?: AppGuidedTourDirective;

  /** Activate next step. */
  public next() {
    this.active?.dispose();
    const stepIndex = (this.active?.appGuidedTour?.index ?? -1) + 1;
    if (stepIndex <= this.steps.length - 1) {
      this.active = this.steps.at(stepIndex);
      if (typeof this.active !== 'undefined') {
        this.active.display();
      }
    }
  }

  /** Activate previous step. */
  public previous() {
    this.active?.dispose();
    const stepIndex = (this.active?.appGuidedTour?.index ?? -1) - 1;
    if (stepIndex >= 0) {
      this.active = this.steps.at(stepIndex);
      if (typeof this.active !== 'undefined') {
        this.active.display();
      }
    }
  }

  /** End tour. */
  public end() {
    this.active?.dispose();
    this.active = void 0;
  }
}
