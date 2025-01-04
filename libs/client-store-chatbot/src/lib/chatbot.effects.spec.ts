import { TestBed, type TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { getTestBedConfig, newTestBedMetadata } from '@app/client-testing-unit';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';

import { chatbotAction } from './chatbot.actions';
import { AppChatbotEffects } from './chatbot.effects';
import { chatbotReducerConfig, type IChatbotState } from './chatbot.interface';
import { chatbotReducerProvider } from './chatbot.reducer';

describe('AppChatbotEffects', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    imports: [
      StoreModule.forFeature<IChatbotState>(chatbotReducerConfig.featureName, chatbotReducerConfig.token),
      EffectsModule.forFeature([AppChatbotEffects]),
    ],
    providers: [chatbotReducerProvider],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let store: Store<IChatbotState>;
  let router: Router;
  let routerNavigateSpy: jest.SpyInstance;

  beforeEach(async () => {
    await TestBed.configureTestingModule(testBedConfig).compileComponents();
    store = TestBed.inject(Store);
    router = TestBed.inject(Router);
    routerNavigateSpy = jest.spyOn(router, 'navigate').mockImplementation(() => new Promise<boolean>(resolve => resolve(true)));
  });

  it('should call router.navigate when the open action is dispatched', waitForAsync(() => {
    store.dispatch(chatbotAction.open());
    expect(routerNavigateSpy).toHaveBeenCalledWith([{ outlets: { chatbot: ['root'] } }]);
  }));

  it('should call router.navigate when the close action is dispatched', waitForAsync(() => {
    store.dispatch(chatbotAction.close());
    expect(routerNavigateSpy).toHaveBeenCalledWith([{ outlets: { chatbot: [] } }]);
  }));
});
