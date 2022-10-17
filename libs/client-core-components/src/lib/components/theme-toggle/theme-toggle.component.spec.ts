import { ComponentFixture, TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { AppThemeStoreModule, themeActions } from '@app/client-store-theme';
import { getTestBedConfig, newTestBedMetadata } from '@app/client-testing-unit';
import { Store } from '@ngrx/store';

import { AppThemeToggleComponent } from './theme-toggle.component';

describe('AppThemeToggleComponent', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    imports: [AppThemeStoreModule.forRoot()],
    declarations: [AppThemeToggleComponent],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let fixture: ComponentFixture<AppThemeToggleComponent>;
  let component: AppThemeToggleComponent;
  let store: Store;
  let storeSpy: {
    dispatch: jest.SpyInstance;
  };

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppThemeToggleComponent);
        component = fixture.debugElement.componentInstance;

        store = TestBed.inject(Store);
        storeSpy = {
          dispatch: jest.spyOn(store, 'dispatch'),
        };

        fixture.detectChanges();
      });
  }));

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('toggleMaterialTheme should call store dispatch and emit an output event', () => {
    const outputSpy = jest.spyOn(component.themeToggled, 'emit');
    component.toggleMaterialTheme();
    expect(storeSpy.dispatch).toHaveBeenCalledWith(themeActions.toggleDarkTheme());
    expect(outputSpy).toHaveBeenCalledWith(true);
    storeSpy.dispatch.mockClear();
    outputSpy.mockClear();
    component.toggleMaterialTheme();
    expect(storeSpy.dispatch).toHaveBeenCalledWith(themeActions.toggleDarkTheme());
    expect(outputSpy).toHaveBeenCalledWith(false);
  });
});
