import { type ComponentFixture, TestBed, type TestModuleMetadata } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AppSidebarStoreModule, sidebarAction } from '@app/client-store-sidebar';
import { AppTestingComponent, getTestBedConfig, newTestBedMetadata } from '@app/client-testing-unit';
import { Store } from '@ngrx/store';
import type { MockInstance } from 'vitest';

import { AppContentComponent } from './content.component';

describe('AppContentComponent', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    imports: [AppSidebarStoreModule.forRoot()],
    providers: [
      provideRouter([
        {
          path: '',
          component: AppTestingComponent,
        },
      ]),
    ],
    declarations: [AppContentComponent],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let fixture: ComponentFixture<AppContentComponent>;
  let component: AppContentComponent;
  let store: Store;
  let storeSpy: {
    dispatch: MockInstance;
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule(testBedConfig).compileComponents();
    fixture = TestBed.createComponent(AppContentComponent);
    component = fixture.debugElement.componentInstance;
    store = TestBed.inject(Store);
    storeSpy = {
      dispatch: vi.spyOn(store, 'dispatch').mockImplementation((action: unknown) => ({ destroy: () => void 0 })),
    };
    fixture.detectChanges();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('sidebarCloseHandler should call store dispatch', () => {
    component.sidebarCloseHandler();
    expect(storeSpy.dispatch).toHaveBeenCalledWith(sidebarAction.close({ payload: { navigate: true } }));
  });

  it('sidebarOpenHandler should call store dispatch', () => {
    component.sidebarOpenHandler();
    expect(storeSpy.dispatch).toHaveBeenCalledWith(sidebarAction.open({ payload: { navigate: true } }));
  });
});
