import { Inject, Injectable, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { AppChatbotRootComponent } from '@app/client-chatbot';
import { WINDOW } from '@app/client-util';

@Injectable({
  providedIn: 'root',
})
export class AppElementsService {
  constructor(private readonly injector: Injector, @Inject(WINDOW) private readonly window: Window) {}

  public registerElements(): void {
    this.registerChatbotWidget();
  }

  private registerChatbotWidget(): void {
    const chatbotWidget = createCustomElement<AppChatbotRootComponent>(AppChatbotRootComponent, {
      injector: this.injector,
    });
    if (typeof this.window.customElements.get('app-chatbot-root') === 'undefined') {
      this.window.customElements.define('app-chatbot-root', chatbotWidget);
    }
  }
}
