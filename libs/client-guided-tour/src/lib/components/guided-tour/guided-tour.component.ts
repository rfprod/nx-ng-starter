import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { AppGuidedTourService } from '../../services/guided-tour/guided-tour.service';
import { GUIDED_TOUR_DATA } from './guided-tour.interface';

/** Guided tour component. */
@Component({
  selector: 'app-guided-tour',
  templateUrl: './guided-tour.component.html',
  styleUrls: ['./guided-tour.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class AppGuidedTourComponent {
  public readonly tour = inject(AppGuidedTourService);

  public readonly data = inject(GUIDED_TOUR_DATA);
}
