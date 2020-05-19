import { async, ComponentFixture, TestBed, TestModuleMetadata } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  getTestBedConfig,
  newTestBedMetadata,
  setupJestSpiesFor,
  TComponentSpiesObject,
} from '@nx-ng-starter/mocks-core';

import { AppIndexComponent } from '../app-index/index/app-index.component';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    declarations: [AppComponent, AppIndexComponent],
    imports: [
      RouterTestingModule.withRoutes([
        { path: '', component: AppIndexComponent },
        { path: '', redirectTo: '', pathMatch: 'full' },
        { path: '**', redirectTo: '' },
      ]),
    ],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let spy: {
    component: TComponentSpiesObject<AppComponent>;
  };

  beforeEach(async(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        spy = {
          component: setupJestSpiesFor<AppComponent>(component),
        };
        expect(spy.component).toBeDefined();
        fixture.detectChanges();
      });
  }));

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should have as title "Nx Ng Starter"', () => {
    expect(component.title).toEqual('Nx Ng Starter');
  });

  it('should render two toolbars', () => {
    const compiled: HTMLElement = fixture.debugElement.nativeElement;
    const expectedLength = 2;
    expect(compiled.querySelectorAll('mat-toolbar').length).toEqual(expectedLength);
  });
});
