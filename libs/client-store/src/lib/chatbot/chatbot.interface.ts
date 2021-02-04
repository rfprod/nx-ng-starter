import { StateToken } from '@ngxs/store';
import { IActionPayload } from '@nx-ng-starter/client-util';
import { Observable } from 'rxjs';

export interface IChatbotState {
  chatbotOpened: boolean;
}

export const chatbotInitialState: IChatbotState = {
  chatbotOpened: false,
};

export const CHATBOT_STATE_TOKEN = new StateToken<IChatbotState>('chatbot');

export type TChatbotPayload = IActionPayload<IChatbotState>;

export interface IAppChatbotService {
  chatbotOpened$: Observable<boolean>;
}
