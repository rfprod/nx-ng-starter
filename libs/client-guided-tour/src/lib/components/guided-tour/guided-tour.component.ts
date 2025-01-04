import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';

import { AppGuidedTourService } from '../../services/guided-tour/guided-tour.service';
import { GUIDED_TOUR_DATA, IGuidedTourData } from './guided-tour.interface';

/** Guided tour component. */
@Component({
  selector: 'app-guided-tour',
  templateUrl: './guided-tour.component.html',
  styleUrls: ['./guided-tour.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class AppGuidedTourComponent {
  /**
   * @param tour  Guided tour service.
   * @param data Guided tour step data.
   */
  constructor(
    public readonly tour: AppGuidedTourService,
    @Inject(GUIDED_TOUR_DATA) public readonly data: IGuidedTourData,
  ) {}
}
