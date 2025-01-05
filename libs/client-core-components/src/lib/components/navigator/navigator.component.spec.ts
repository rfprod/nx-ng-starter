import { OverlayModule } from '@angular/cdk/overlay';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { type ComponentFixture, TestBed, type TestModuleMetadata } from '@angular/core/testing';
import { newTestBedMetadata } from '@app/client-testing-unit';

import { AppNavigatorComponent } from './navigator.component';

describe('AppNavigatorComponent', () => {
  const testBedConfig: TestModuleMetadata = newTestBedMetadata({
    imports: [OverlayModule],
    declarations: [AppNavigatorComponent],
    schemas: [NO_ERRORS_SCHEMA],
  });

  let fixture: ComponentFixture<AppNavigatorComponent>;
  let component: AppNavigatorComponent;
  let spy: {
    back: jest.SpyInstance;
    forward: jest.SpyInstance;
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule(testBedConfig).compileComponents();
    fixture = TestBed.createComponent(AppNavigatorComponent);
    component = fixture.debugElement.componentInstance;
    spy = {
      back: jest.spyOn(component.nagivateBack, 'emit'),
      forward: jest.spyOn(component.nagivateForward, 'emit'),
    };
    fixture.detectChanges();
  });

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
