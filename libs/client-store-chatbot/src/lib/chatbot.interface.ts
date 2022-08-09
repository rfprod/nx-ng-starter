export interface IChatbotStateModel {
  chatbotOpened: boolean;
}

export interface IChatbotState {
  chatbot: IChatbotStateModel;
}

export const featureName: keyof IChatbotState = 'chatbot';
