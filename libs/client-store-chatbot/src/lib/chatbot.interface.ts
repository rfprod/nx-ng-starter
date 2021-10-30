import { IActionPayload } from '@app/client-util';
import { StateToken } from '@ngxs/store';

export interface IChatbotState {
  chatbotOpened: boolean;
}

export const chatbotInitialState: IChatbotState = {
  chatbotOpened: false,
};

export const CHATBOT_STATE_TOKEN = new StateToken<IChatbotState>('chatbot');

export type TChatbotPayload = IActionPayload<IChatbotState>;
