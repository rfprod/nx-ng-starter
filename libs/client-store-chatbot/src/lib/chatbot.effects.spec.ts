import { TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { getTestBedConfig, newTestBedMetadata } from '@app/client-testing-unit';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';

import { chatbotActions } from './chatbot.actions';
import { AppChatbotEffects } from './chatbot.effects';
import { featureName, IChatbotState } from './chatbot.interface';
import { AppChatbotReducer } from './chatbot.reducer';

describe('AppChatbotEffects', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    imports: [StoreModule.forFeature<IChatbotState>(featureName, AppChatbotReducer.token), EffectsModule.forFeature([AppChatbotEffects])],
    providers: [AppChatbotReducer.provider],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let store: Store<IChatbotState>;
  let router: Router;
  let routerNavigateSpy: jest.SpyInstance;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        store = TestBed.inject(Store);
        router = TestBed.inject(Router);
        routerNavigateSpy = jest.spyOn(router, 'navigate').mockImplementation(() => new Promise<boolean>(resolve => resolve(true)));
      });
  }));

  it('should call router.navigate when the open action is dispatched', waitForAsync(() => {
    store.dispatch(chatbotActions.open());
    expect(routerNavigateSpy).toHaveBeenCalledWith([{ outlets: { chatbot: ['root'] } }]);
  }));

  it('should call router.navigate when the close action is dispatched', waitForAsync(() => {
    store.dispatch(chatbotActions.close());
    expect(routerNavigateSpy).toHaveBeenCalledWith([{ outlets: { chatbot: [] } }]);
  }));

  it('should call router.navigate when either open or close action is dispatched', waitForAsync(() => {
    store.dispatch(chatbotActions.toggle());
    expect(routerNavigateSpy).toHaveBeenNthCalledWith(1, [{ outlets: { chatbot: ['root'] } }]);
    store.dispatch(chatbotActions.toggle());
    const expectedCalls = 2;
    expect(routerNavigateSpy).toHaveBeenCalledTimes(expectedCalls);
    expect(routerNavigateSpy).toHaveBeenNthCalledWith(expectedCalls, [{ outlets: { chatbot: [] } }]);
  }));
});
