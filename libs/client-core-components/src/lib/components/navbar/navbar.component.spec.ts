import { ComponentFixture, TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { newTestBedMetadata } from '@app/client-testing-unit';
import { of } from 'rxjs';

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
    ],
  });

  let fixture: ComponentFixture<AppNavbarComponent>;
  let component: AppNavbarComponent;

  let router: Router;
  let routerIsActiveSpy: jest.SpyInstance;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppNavbarComponent);
        component = fixture.debugElement.componentInstance;

        router = TestBed.inject(Router);
        routerIsActiveSpy = jest.spyOn(router, 'isActive');

        fixture.detectChanges();
      });
  }));

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('navButtonClick should emit an output event', () => {
    const spy = jest.spyOn(component.navButtonClicked, 'emit');
    component.navButtonClick();
    expect(spy).toHaveBeenCalled();
  });

  it('buttons should have default values', () => {
    const expectedLength = 5;
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

    const secondButtonIndex = 1;
    component.buttons[secondButtonIndex].routeActive();
    expect(routerIsActiveSpy).toHaveBeenCalledWith('info', {
      matrixParams: 'ignored',
      queryParams: 'ignored',
      paths: 'exact',
      fragment: 'ignored',
    });
    routerIsActiveSpy.mockClear();

    const thirdButtonIndex = 2;
    component.buttons[thirdButtonIndex].routeActive();
    expect(routerIsActiveSpy).toHaveBeenCalledWith('charts', {
      matrixParams: 'ignored',
      queryParams: 'ignored',
      paths: 'exact',
      fragment: 'ignored',
    });
    routerIsActiveSpy.mockClear();

    const fourthButtonIndex = 3;
    component.buttons[fourthButtonIndex].routeActive();
    expect(routerIsActiveSpy).toHaveBeenCalledWith('chatbot', {
      matrixParams: 'ignored',
      queryParams: 'ignored',
      paths: 'exact',
      fragment: 'ignored',
    });
    routerIsActiveSpy.mockClear();

    const fifthButtonIndex = 4;
    component.buttons[fifthButtonIndex].routeActive();
    expect(routerIsActiveSpy).toHaveBeenCalledWith('dashboards', {
      matrixParams: 'ignored',
      queryParams: 'ignored',
      paths: 'exact',
      fragment: 'ignored',
    });
    routerIsActiveSpy.mockClear();
  });

  it('navigateBack should emit an output event', () => {
    const spy = jest.spyOn(component.navigatedBack, 'emit');
    component.navigateBack();
    expect(spy).toHaveBeenCalled();
  });

  it('navigateForward should emit an output event', () => {
    const spy = jest.spyOn(component.navigatedForward, 'emit');
    component.navigateForward();
    expect(spy).toHaveBeenCalled();
  });
});
