import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { minMessageLength } from '../../interfaces/form.interface';
import { IChatMessage } from '../../interfaces/message.interface';

@Component({
  selector: 'app-chatbot-root',
  templateUrl: './chatbot-root.component.html',
  styleUrls: ['./chatbot-root.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppChatbotRootComponent {
  private readonly messagesSubject = new BehaviorSubject<IChatMessage[]>([
    { bot: true, text: 'message 1' },
    { bot: false, text: 'message 2' },
    { bot: true, text: 'message 3' },
    { bot: true, text: 'message 4' },
    { bot: false, text: 'message 5' },
    { bot: true, text: 'message 6' },
    { bot: true, text: 'message 7' },
    { bot: false, text: 'message 8' },
    { bot: true, text: 'message 9' },
    { bot: true, text: 'message 10' },
    { bot: false, text: 'message 11' },
    { bot: true, text: 'message 12' },
  ]);

  public readonly messages$ = this.messagesSubject.asObservable();

  constructor(private readonly fb: FormBuilder) {}

  public readonly form = this.fb.group({
    message: ['', Validators.compose([Validators.required, Validators.minLength(minMessageLength)])],
  });

  public sendMessage() {
    const message: IChatMessage = { bot: false, text: this.form.controls.message.value };
    const nextValue = [...this.messagesSubject.value, message];
    this.messagesSubject.next(nextValue);
  }
}
