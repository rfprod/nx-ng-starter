import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

@Component({
  selector: 'app-chatbot-root',
  templateUrl: './chatbot-root.component.html',
  styleUrls: ['./chatbot-root.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppChatbotRootComponent {
  public readonly messages$ = of([
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

  constructor(private readonly fb: FormBuilder) {}

  public readonly form = this.fb.group({
    message: [''],
  });

  public sendMessage() {
    // TODO: send message
  }
}
