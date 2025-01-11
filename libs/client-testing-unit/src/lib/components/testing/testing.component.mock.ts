import { Component } from '@angular/core';

/**
 * Testing component.
 */
@Component({
  selector: 'app-testing-component',
  template: '<span appTooltip appAutoscroll class="scrollable">dummy component</span>',
  standalone: false,
})
export class AppTestingComponent {}
