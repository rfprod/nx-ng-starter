import { TestBed, type TestModuleMetadata } from '@angular/core/testing';
import { getTestBedConfig, newTestBedMetadata } from '@app/client-testing-unit';
import { Store, StoreModule } from '@ngrx/store';
import { first, lastValueFrom } from 'rxjs';

import { chatbotAction } from './chatbot.actions';
import { chatbotReducerConfig, type IChatbotState, type IChatbotStateModel } from './chatbot.interface';
import { AppChatbotReducer, chatbotReducerProvider } from './chatbot.reducer';
import { chatbotSelector } from './chatbot.selectors';

describe('AppChatbotReducer', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    imports: [StoreModule.forFeature<IChatbotState>(chatbotReducerConfig.featureName, chatbotReducerConfig.token)],
    providers: [chatbotReducerProvider],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let reducer: AppChatbotReducer;
  let store: Store<IChatbotState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule(testBedConfig).compileComponents();
    reducer = TestBed.inject(AppChatbotReducer);
    store = TestBed.inject(Store);
  });

  it('should be defined', () => {
    expect(reducer).toBeDefined();
  });

  it('should have correct initial state', () => {
    const initialState = chatbotReducerConfig.initialState;
    const expectation: IChatbotStateModel = { chatbotOpen: false };
    expect(initialState).toEqual(expectation);
  });

  it('should process the open/close action correctly', async () => {
    store.dispatch(chatbotAction.open());
    let chatbotOpen = await lastValueFrom(store.select(chatbotSelector.chatbotOpen).pipe(first()));
    expect(chatbotOpen).toBeTruthy();

    store.dispatch(chatbotAction.close());
    chatbotOpen = await lastValueFrom(store.select(chatbotSelector.chatbotOpen).pipe(first()));
    expect(chatbotOpen).toBeFalsy();
  });
});
