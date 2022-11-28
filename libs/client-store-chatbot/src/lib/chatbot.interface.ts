export interface IChatbotStateModel {
  chatbotOpen: boolean;
}

export interface IChatbotState {
  chatbot: IChatbotStateModel;
}

export const featureName: keyof IChatbotState = 'chatbot';
