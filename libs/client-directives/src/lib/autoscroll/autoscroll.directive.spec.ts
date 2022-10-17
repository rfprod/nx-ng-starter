import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppTestingComponent } from '@app/client-testing-unit';
import { timer } from 'rxjs';
import { take, tap } from 'rxjs/operators';

import { AppAutoscrollDirective } from './autoscroll.directive';

describe('AppAutoscrollDirective', () => {
  let fixture: ComponentFixture<AppTestingComponent>;
  let debugElement: DebugElement;
  let directive: AppAutoscrollDirective;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule({
      declarations: [AppTestingComponent, AppAutoscrollDirective],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppTestingComponent);
        debugElement = fixture.debugElement.query(By.directive(AppAutoscrollDirective));
        directive = debugElement.injector.get(AppAutoscrollDirective);
        // fixture.detectChanges();
      });
  }));

  it('should compile successfully', () => {
    expect(directive).toBeDefined();
  });

  it('autoscroll should work correctly', waitForAsync(() => {
    const testingElement: HTMLElement = debugElement.nativeElement;
    const inputHeight = testingElement.querySelector('input')?.clientHeight ?? 0;
    const testingElementHeight = testingElement.clientHeight;
    const interval = 500;
    const elementsCount = 10;
    void timer(0, interval)
      .pipe(
        tap(() => {
          const newDiv = document.createElement('div');
          newDiv.innerText = 'new div';
          const newDivHeight = newDiv.clientHeight;
          testingElement.appendChild(newDiv);
          let scrollValue = testingElement.scrollHeight - testingElementHeight - newDivHeight - inputHeight - 1;
          scrollValue = scrollValue < 0 ? 0 : scrollValue;
          expect(testingElement.scrollTop).toEqual(scrollValue);
        }),
        take(elementsCount),
      )
      .subscribe();
  }));
});
