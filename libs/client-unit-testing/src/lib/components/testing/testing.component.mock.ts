import { Component } from '@angular/core';

/**
 * Testing component.
 * Mostly used for mocking in specs.
 * Can be used when designing routing.
 */
@Component({
  selector: 'app-testing-component',
  template: '<span appTooltip>dummy component</span>',
})
export class AppTestingComponent {}
