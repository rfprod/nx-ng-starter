import { Component } from '@angular/core';

/**
 * Dummy component.
 * Mostly used for mocking in specs.
 * Can be used when designing routing.
 */
@Component({
  selector: 'nx-ng-starter-dummy-component',
  template: `
    <span>dummy component</span>
  `,
  styles: ['./dummy.component.mock.scss'],
})
export class DummyComponent {}
