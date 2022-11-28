import { ComponentFixture, TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { AppChatbotStoreModule, chatbotActions } from '@app/client-store-chatbot';
import { AppSidebarStoreModule, sidebarActions } from '@app/client-store-sidebar';
import { getTestBedConfig, newTestBedMetadata } from '@app/client-testing-unit';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { AppToolbarComponent } from './toolbar.component';

describe('AppToolbarComponent', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    imports: [AppSidebarStoreModule.forRoot(), AppChatbotStoreModule.forRoot()],
    declarations: [AppToolbarComponent],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let fixture: ComponentFixture<AppToolbarComponent>;
  let component: AppToolbarComponent;
  let store: Store;
  let storeSpy: {
    dispatch: jest.SpyInstance;
  };

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppToolbarComponent);
        component = fixture.debugElement.componentInstance;

        store = TestBed.inject(Store);
        storeSpy = {
          dispatch: jest.spyOn(store, 'dispatch').mockImplementation((action: unknown) => of(null)),
        };

        fixture.detectChanges();
      });
  }));

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('toggleSidebar should call store dispatch', waitForAsync(() => {
    component.toggleSidebar();
    expect(storeSpy.dispatch).toHaveBeenCalledWith(sidebarActions.toggle());
  }));

  it('toggleChatbot should call store dispatch', waitForAsync(() => {
    component.toggleChatbot();
    expect(storeSpy.dispatch).toHaveBeenCalledWith(chatbotActions.open());
  }));

  it('toggleMaterialTheme should emit an output event', () => {
    const outputSpy = jest.spyOn(component.darkThemeEnabled, 'emit');
    const event = true;
    component.toggleMaterialTheme(event);
    expect(outputSpy).toHaveBeenCalledWith(event);
  });
});
