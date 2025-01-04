import { Component, DebugElement, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AppFullScreenDirective } from './full-screen.directive';

/**
 * Testing component.
 */
@Component({
  selector: 'app-testing-component',
  template: '<span appFullScreen #fullScreen="fullScreen">dummy component</span>',
  standalone: false,
})
class AppTestingComponent {}

describe('AppFullScreenDirective', () => {
  let fixture: ComponentFixture<AppTestingComponent>;
  let debugElement: DebugElement;
  let directive: AppFullScreenDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppTestingComponent, AppFullScreenDirective],
      providers: [
        {
          provide: ElementRef,
          useValue: {
            nativeElement: document.createElement('div'),
          },
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppTestingComponent);
    debugElement = fixture.debugElement.query(By.directive(AppFullScreenDirective));
    directive = debugElement.injector.get(AppFullScreenDirective);
  });

  it('should compile successfully', () => {
    expect(directive).toBeDefined();
  });

  test.todo('AppFullScreenDirective');
});
