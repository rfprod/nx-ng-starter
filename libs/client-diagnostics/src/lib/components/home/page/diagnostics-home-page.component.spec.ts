import { ComponentFixture, TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { getTestBedConfig, newTestBedMetadata } from '@app/client-testing-unit';

import { AppDiagnosticsHomePage } from './diagnostics-home-page.component';

describe('AppDiagnosticsHomePage', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    declarations: [AppDiagnosticsHomePage],
    imports: [
      RouterTestingModule.withRoutes([
        { path: '', component: AppDiagnosticsHomePage },
        { path: '', redirectTo: '', pathMatch: 'full' },
        { path: '**', redirectTo: '' },
      ]),
    ],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let fixture: ComponentFixture<AppDiagnosticsHomePage>;
  let component: AppDiagnosticsHomePage;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppDiagnosticsHomePage);
        component = fixture.debugElement.componentInstance;
        fixture.detectChanges();
      });
  }));

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('timerChanges should set timer value correctly #1', () => {
    const change = 'timer changes 10';
    component.timerChanges(change);
    expect(component.timer).toEqual(change);
  });

  it('timerChanges should set timer value correctly #2', () => {
    const base = 2;
    const exponent = 11;
    const change = `timer changes ${exponent}`;
    component.timerChanges(change);
    expect(component.timer).toEqual(`The timer is freaking out ${Math.pow(base, exponent)}`);
  });

  it('timerChanges should set timer value correctly #3', () => {
    component.timerChanges();
    expect(component.timer).toEqual('');
  });

  it('ngOnChanges should work correctly #1', () => {
    component.timer = '60';
    component.ngOnChanges({
      timer: { currentValue: component.timer, firstChange: true, isFirstChange: () => true, previousValue: null },
      markedInstructions: {
        currentValue: '',
        firstChange: true,
        isFirstChange: () => true,
        previousValue: null,
      },
    });
    expect(component.timer).toEqual(component.timer);
  });

  it('ngOnChanges should work correctly #2', () => {
    component.timer = '61';
    component.ngOnChanges({
      timer: { currentValue: component.timer, firstChange: true, isFirstChange: () => true, previousValue: null },
      markedInstructions: {
        currentValue: '',
        firstChange: true,
        isFirstChange: () => true,
        previousValue: null,
      },
    });
    const base = 2;
    const exponent = 61;
    expect(component.timer).toEqual(`The timer is freaking out ${Math.pow(base, exponent)}`);
  });
});
