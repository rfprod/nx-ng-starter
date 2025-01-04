import { ChangeDetectionStrategy, Component, computed, HostListener, signal } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AppElizaService, IChatMessage } from '@app/client-util-eliza';

@Component({
  selector: 'app-chatbot-root',
  templateUrl: './chatbot-root.component.html',
  styleUrls: ['./chatbot-root.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class AppChatbotRootComponent {
  public readonly messages$ = this.eliza.messages$;

  private readonly nextUserMessage$ = signal<IChatMessage | null>(null);

  public readonly respond$ = computed(async () => {
    const message = this.nextUserMessage$();
    if (message !== null && !message.bot) {
      const text = message.text;
      const response = await this.eliza.getResponse(text);
      this.botResponse(response.reply);
      if (response.final) {
        this.form.disable();
      }
    }
  });

  public readonly form = this.fb.group({
    message: [''],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly eliza: AppElizaService,
  ) {}

  public resetBot() {
    this.eliza.reset();
    this.form.enable();
  }

  public userMessage() {
    const text = this.form.controls.message.value;
    if (text !== null && text !== '') {
      const message: IChatMessage = { bot: false, text };
      this.nextUserMessage$.set(message);
      this.eliza.nextMessage(message);
      this.form.reset();
    }
  }

  public botResponse(text: string) {
    const message: IChatMessage = { bot: true, text };
    this.eliza.nextMessage(message);
  }

  @HostListener('window:keyup', ['$event'])
  public keyUp(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === 'Enter') {
      this.userMessage();
    }
  }
}
