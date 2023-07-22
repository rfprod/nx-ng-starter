import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AppElizaService, IChatMessage } from '@app/client-util-eliza';
import { BehaviorSubject, from, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-chatbot-root',
  templateUrl: './chatbot-root.component.html',
  styleUrls: ['./chatbot-root.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppChatbotRootComponent {
  public readonly messages$ = this.eliza.messages$;

  private readonly nextUserMessageSubject = new BehaviorSubject<IChatMessage | null>(null);

  public readonly respond$ = this.nextUserMessageSubject.asObservable().pipe(
    switchMap(message => {
      if (message !== null && !message.bot) {
        const text = message.text;
        return from(this.eliza.getResponse(text));
      }
      return of(null);
    }),
    tap(response => {
      if (response !== null) {
        this.botResponse(response.reply);
        if (response.final) {
          this.form.disable();
        }
      }
    }),
  );

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
      this.nextUserMessageSubject.next(message);
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
