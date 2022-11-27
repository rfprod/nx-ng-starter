import { TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { getTestBedConfig, newTestBedMetadata } from '@app/client-testing-unit';
import { Store, StoreModule } from '@ngrx/store';
import { first, switchMap, tap } from 'rxjs';

import { chatbotActions } from './chatbot.actions';
import { featureName, IChatbotState, IChatbotStateModel } from './chatbot.interface';
import { AppChatbotReducer } from './chatbot.reducer';
import { chatbotSelectors } from './chatbot.selectors';

describe('AppChatbotReducer', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    imports: [StoreModule.forFeature<IChatbotState>(featureName, AppChatbotReducer.token)],
    providers: [AppChatbotReducer.provider],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let reducer: AppChatbotReducer;
  let store: Store<IChatbotState>;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        reducer = TestBed.inject(AppChatbotReducer);
        store = TestBed.inject(Store);
      });
  }));

  it('should be defined', () => {
    expect(reducer).toBeDefined();
  });

  it('should have correct initial state', () => {
    const initialState = AppChatbotReducer.initialState;
    const expectation: IChatbotStateModel = { chatbotOpen: false };
    expect(initialState).toEqual(expectation);
  });

  it('should process the open/close action correctly', waitForAsync(() => {
    store.dispatch(chatbotActions.open());
    void store
      .select(chatbotSelectors.chatbotOpen)
      .pipe(
        first(),
        tap(chatbotOpen => {
          expect(chatbotOpen).toBeTruthy();
          store.dispatch(chatbotActions.close());
        }),
        switchMap(() => store.select(chatbotSelectors.chatbotOpen)),
        tap(chatbotOpen => {
          expect(chatbotOpen).toBeFalsy();
        }),
      )
      .subscribe();
  }));
});
