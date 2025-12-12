import { Injectable } from '@angular/core';

import { IGuidedTourDirective } from '../../components/guided-tour/guided-tour.interface';

/**
 * @title Guided tour service.
 * @description This service should be injected once for each tour. Use component `providers` array to declare.
 */
@Injectable({
  providedIn: 'root',
})
export class AppGuidedTourService {
  /** Guider tour steps. */
  private steps: IGuidedTourDirective[] = [];

  /** Guided tour step configuration. */
  public set configuration(steps: IGuidedTourDirective[]) {
    this.steps = steps.sort((x, y) => (x.appGuidedTour?.index ?? 0) - (y.appGuidedTour?.index ?? 0));
  }

  /** Active step. */
  public active?: IGuidedTourDirective;

  /** Activates next step. */
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

  /** Activates previous step. */
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

  /** Ends tour. */
  public end() {
    this.active?.dispose();
    this.active = void 0;
  }
}
