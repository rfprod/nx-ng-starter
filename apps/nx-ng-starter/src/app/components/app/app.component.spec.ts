import { ComponentFixture, TestBed, TestModuleMetadata, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  TComponentSpiesObject,
  getTestBedConfig,
  newTestBedMetadata,
  setupJestSpiesFor,
} from '@nx-ng-starter/mocks-core';
import { SharedCoreModule } from '@nx-ng-starter/shared-core';
import { AppIndexComponent } from 'apps/nx-ng-starter/src/app/components/app-index/index/app-index.component';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    declarations: [AppComponent, AppIndexComponent],
    imports: [
      SharedCoreModule.forRoot(),
      RouterTestingModule.withRoutes([
        { path: '', component: AppIndexComponent },
        { path: '', redirectTo: '', pathMatch: 'full' },
        { path: '**', redirectTo: '' },
      ]),
    ],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent | any;
  let spy: {
    component: TComponentSpiesObject<AppComponent>;
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule(testBedConfig)
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
  it('should should render two toolbars', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('mat-toolbar').length).toEqual(1 + 1);
  });
});
