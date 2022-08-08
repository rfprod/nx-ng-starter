import { ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppChatbotEffects } from './chatbot.effects';
import { featureName, IChatbotState } from './chatbot.interface';
import { AppChatbotReducer } from './chatbot.reducer';

@NgModule({
  imports: [StoreModule.forFeature<IChatbotState>(featureName, AppChatbotReducer.token), EffectsModule.forFeature([AppChatbotEffects])],
})
export class AppChatbotStoreModule {
  public static forRoot(): ModuleWithProviders<AppChatbotStoreModule> {
    return {
      ngModule: AppChatbotStoreModule,
      providers: [AppChatbotReducer.provider],
    };
  }
}
