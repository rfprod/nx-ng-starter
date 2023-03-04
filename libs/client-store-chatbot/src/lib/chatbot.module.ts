import { ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppChatbotEffects } from './chatbot.effects';
import { chatbotReducerConfig, IChatbotState } from './chatbot.interface';
import { chatbotReducerProvider } from './chatbot.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature<IChatbotState>(chatbotReducerConfig.featureName, chatbotReducerConfig.token),
    EffectsModule.forFeature([AppChatbotEffects]),
  ],
})
export class AppChatbotStoreModule {
  public static forRoot(): ModuleWithProviders<AppChatbotStoreModule> {
    return {
      ngModule: AppChatbotStoreModule,
      providers: [chatbotReducerProvider],
    };
  }
}
