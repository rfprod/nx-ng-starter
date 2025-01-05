import { Component } from '@angular/core';
import { ComponentFixture, TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { getTestBedConfig, newTestBedMetadata } from '@app/client-testing-unit';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';

import { featureAccessAction } from '../../feature-access.actions';
import { AppFeatureAccessEffects } from '../../feature-access.effects';
import { featureAccessReducerConfig, IFeatureAccessState } from '../../feature-access.interface';
import { featureAccessReducerProvider } from '../../feature-access.reducer';
import { AppFeatureFlagDirective } from './feature-flag.directive';

@Component({
  selector: 'app-feature-access-directive-test-component',
  template: `<ng-template [appFeatureFlag]="flag">
    <span>test</span>
  </ng-template> `,
  standalone: false,
})
class AppFeatureFlagTestComponent {
  public flag?: string | null = null;
}

describe('AppFeatureFlagDirective', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    imports: [
      StoreModule.forFeature<IFeatureAccessState>(featureAccessReducerConfig.featureName, featureAccessReducerConfig.token),
      EffectsModule.forFeature([AppFeatureAccessEffects]),
    ],
    providers: [featureAccessReducerProvider],
    declarations: [AppFeatureFlagTestComponent, AppFeatureFlagDirective],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let component: AppFeatureFlagTestComponent;
  let fixture: ComponentFixture<AppFeatureFlagTestComponent>;

  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule(testBedConfig).compileComponents();

    fixture = TestBed.createComponent(AppFeatureFlagTestComponent);
    component = fixture.componentInstance;

    store = TestBed.inject(Store);
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });

  it('should display span in a production environment if the flag value is null', waitForAsync(() => {
    store.dispatch(featureAccessAction.setEnvironment({ payload: { production: true } }));
    expect(component.flag).toBeNull();
    fixture.detectChanges();
    const spans = (fixture.debugElement.nativeElement as HTMLElement).getElementsByTagName('span');
    expect(spans.length).toEqual(1);
  }));

  it('should not display span in a production environment if the flag value is undefined', waitForAsync(() => {
    store.dispatch(featureAccessAction.setEnvironment({ payload: { production: true } }));
    component.flag = void 0;
    expect(component.flag).toBeUndefined();
    fixture.detectChanges();
    const spans = (fixture.debugElement.nativeElement as HTMLElement).getElementsByTagName('span');
    expect(spans.length).toEqual(0);
  }));

  it('should not display span in a production environment if the flag value is en empty string', waitForAsync(() => {
    store.dispatch(featureAccessAction.setEnvironment({ payload: { production: true } }));
    component.flag = '';
    expect(component.flag).toEqual('');
    fixture.detectChanges();
    const spans = (fixture.debugElement.nativeElement as HTMLElement).getElementsByTagName('span');
    expect(spans.length).toEqual(0);
  }));

  it('should not display span in a production environment if the flag value is a feature name and the feature flag is not defined', waitForAsync(() => {
    store.dispatch(featureAccessAction.setEnvironment({ payload: { production: true } }));
    component.flag = 'test';
    expect(component.flag).toEqual('test');
    fixture.detectChanges();
    const spans = (fixture.debugElement.nativeElement as HTMLElement).getElementsByTagName('span');
    expect(spans.length).toEqual(0);
  }));

  it('should display span in a production environment if the flag value is a feature name and the feature is disabled', waitForAsync(() => {
    store.dispatch(featureAccessAction.setFeatureFlags({ payload: { test: false } }));
    component.flag = 'test';
    expect(component.flag).toEqual('test');
    fixture.detectChanges();
    const spans = (fixture.debugElement.nativeElement as HTMLElement).getElementsByTagName('span');
    expect(spans.length).toEqual(1);
  }));

  it('should not display span in a production environment if the flag value is a feature name and the feature is disabled', waitForAsync(() => {
    store.dispatch(featureAccessAction.setEnvironment({ payload: { production: true } }));
    store.dispatch(featureAccessAction.setFeatureFlags({ payload: { test: false } }));
    component.flag = 'test';
    expect(component.flag).toEqual('test');
    fixture.detectChanges();
    const spans = (fixture.debugElement.nativeElement as HTMLElement).getElementsByTagName('span');
    expect(spans.length).toEqual(0);
  }));

  it('should display span in a production environment if the flag value is a feature name and the feature is enabled', waitForAsync(() => {
    store.dispatch(featureAccessAction.setFeatureFlags({ payload: { test: true } }));
    component.flag = 'test';
    expect(component.flag).toEqual('test');
    fixture.detectChanges();
    const spans = (fixture.debugElement.nativeElement as HTMLElement).getElementsByTagName('span');
    expect(spans.length).toEqual(1);
  }));

  it('should display span in a production environment if the flag value is a feature name and the feature is enabled', waitForAsync(() => {
    store.dispatch(featureAccessAction.setEnvironment({ payload: { production: true } }));
    store.dispatch(featureAccessAction.setFeatureFlags({ payload: { test: true } }));
    component.flag = 'test';
    expect(component.flag).toEqual('test');
    fixture.detectChanges();
    const spans = (fixture.debugElement.nativeElement as HTMLElement).getElementsByTagName('span');
    expect(spans.length).toEqual(1);
  }));
});
