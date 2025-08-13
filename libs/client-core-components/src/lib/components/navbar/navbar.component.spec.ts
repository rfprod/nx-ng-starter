import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { type ComponentFixture, TestBed, type TestModuleMetadata } from '@angular/core/testing';
import { Router } from '@angular/router';
import { newTestBedMetadata } from '@app/client-testing-unit';
import { windowProvider } from '@app/client-util';
import { of } from 'rxjs';
import type { MockInstance } from 'vitest';

import { AppNavbarComponent } from './navbar.component';

describe('AppNavbarComponent', () => {
  const testBedConfig: TestModuleMetadata = newTestBedMetadata({
    declarations: [AppNavbarComponent],
    providers: [
      {
        provide: Router,
        useValue: {
          events: of(null),
          isActive: () => false,
        },
      },
      windowProvider,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  });

  let fixture: ComponentFixture<AppNavbarComponent>;
  let component: AppNavbarComponent;

  let router: Router;
  let routerIsActiveSpy: MockInstance;

  beforeEach(async () => {
    await TestBed.configureTestingModule(testBedConfig).compileComponents();
    fixture = TestBed.createComponent(AppNavbarComponent);
    component = fixture.debugElement.componentInstance;
    router = TestBed.inject(Router);
    routerIsActiveSpy = vi.spyOn(router, 'isActive');
    fixture.detectChanges();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('navButtonClick should emit an output event', () => {
    const spy = vi.spyOn(component.navButtonClicked, 'emit');
    component.navButtonClick();
    expect(spy).toHaveBeenCalled();
  });

  it('buttons should have default values', () => {
    const expectedLength = 1;
    expect(component.buttons.length).toEqual(expectedLength);
  });

  it('buttons, routeActive should call router isActive with params', () => {
    const firstButtonIndex = 0;
    component.buttons[firstButtonIndex].routeActive();
    expect(routerIsActiveSpy).toHaveBeenCalledWith('', {
      matrixParams: 'ignored',
      queryParams: 'ignored',
      paths: 'exact',
      fragment: 'ignored',
    });
    routerIsActiveSpy.mockClear();
  });

  it('navigateBack should emit an output event', () => {
    const spy = vi.spyOn(component.navigatedBack, 'emit');
    component.navigateBack();
    expect(spy).toHaveBeenCalled();
  });

  it('navigateForward should emit an output event', () => {
    const spy = vi.spyOn(component.navigatedForward, 'emit');
    component.navigateForward();
    expect(spy).toHaveBeenCalled();
  });
});
