import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { newTestBedMetadata } from '@app/client-testing-unit';

import { AppHistoryNavigatorComponent } from './history-navigator.component';

describe('AppHistoryNavigatorComponent', () => {
  const testBedConfig: TestModuleMetadata = newTestBedMetadata({
    declarations: [AppHistoryNavigatorComponent],
    schemas: [NO_ERRORS_SCHEMA],
  });

  let fixture: ComponentFixture<AppHistoryNavigatorComponent>;
  let component: AppHistoryNavigatorComponent;
  let spy: {
    back: jest.SpyInstance;
    forward: jest.SpyInstance;
  };

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppHistoryNavigatorComponent);
        component = fixture.debugElement.componentInstance;

        spy = {
          back: jest.spyOn(component.nagivateBack, 'emit'),
          forward: jest.spyOn(component.nagivateForward, 'emit'),
        };

        fixture.detectChanges();
      });
  }));

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('back should emit a respective event', () => {
    component.back();
    expect(spy.back).toHaveBeenCalledTimes(1);
    expect(spy.forward).not.toHaveBeenCalled();
  });

  it('forward should emit a respective event', () => {
    component.forward();
    expect(spy.forward).toHaveBeenCalledTimes(1);
    expect(spy.back).not.toHaveBeenCalled();
  });
});
