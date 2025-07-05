import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Testing component.
 */
@Component({
  selector: 'app-testing-component',
  template: '<span appTooltip appAutoscroll class="scrollable">dummy component</span>',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppTestingComponent {}
