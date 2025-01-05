import { AfterViewInit, ChangeDetectionStrategy, Component, QueryList, signal, ViewChildren } from '@angular/core';

import { AppGuidedTourService } from '../../services/guided-tour/guided-tour.service';
import { AppGuidedTourDirective } from '../guided-tour/guided-tour.directive';
import { IGuidedTourData } from '../guided-tour/guided-tour.interface';

/** An example of a guided tour. */
@Component({
  selector: 'app-guided-tour-example',
  templateUrl: './guided-tour-example.component.html',
  styleUrls: ['./guided-tour-example.component.scss'],
  providers: [AppGuidedTourService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class AppGuidedTourExampleComponent implements AfterViewInit {
  /** Tour steps. */
  @ViewChildren(AppGuidedTourDirective) public steps!: QueryList<AppGuidedTourDirective>;

  /** Example tour configuration. */
  public tourConig$ = signal<IGuidedTourData[]>([
    {
      index: 0,
      title: 'first',
      subtitle: 'First step',
      description: 'The first step. Highlighting disabled.',
      first: true,
      last: false,
    },
    {
      index: 1,
      title: 'second',
      subtitle: 'Second step',
      description: 'The second step. Highlighting enabled.',
      first: false,
      last: false,
    },
    {
      index: 2,
      title: 'third',
      subtitle: 'Third step',
      description: 'The third step. Highlighting enabled.',
      first: false,
      last: false,
    },
    {
      index: 3,
      title: 'fourth',
      subtitle: 'Fourth step',
      description: 'The fourth step. Highlighting enabled.',
      first: false,
      last: false,
    },
    {
      index: 4,
      title: 'fifth',
      subtitle: 'Fifth step',
      description: 'The fifth and the final step. Highlighting enabled.',
      first: false,
      last: true,
    },
  ]);

  /**
   * @param tour Guided tour service.
   */
  constructor(public readonly tour: AppGuidedTourService) {}

  public ngAfterViewInit(): void {
    this.tour.configuration = [...this.steps];
  }
}
