import { ComponentFixture, TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { getTestBedConfig, newTestBedMetadata } from '@app/client-unit-testing';
import { tap } from 'rxjs';

import { IChatMessage } from '../../interfaces/message.interface';
import { AppChatbotWidgetRootComponent } from './chatbot-widget-root.component';

describe('AppChatbotWidgetRootComponent', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    declarations: [AppChatbotWidgetRootComponent],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let fixture: ComponentFixture<AppChatbotWidgetRootComponent>;
  let component: AppChatbotWidgetRootComponent;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppChatbotWidgetRootComponent);
        component = fixture.debugElement.componentInstance;

        fixture.detectChanges();
      });
  }));

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('messages$ should have default dummy content', waitForAsync(() => {
    void component.messages$
      .pipe(
        tap(messages => {
          const expected = [
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
          ];
          expect(messages).toEqual(expected);
        }),
      )
      .subscribe();
  }));

  it('sendMessage should append the form message value as a new message', waitForAsync(() => {
    const message: IChatMessage = { bot: false, text: 'test message' };
    component.form.controls.message.patchValue(message.text);
    component.sendMessage();
    void component.messages$
      .pipe(
        tap(messages => {
          const expected = [
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
            message,
          ];
          expect(messages).toEqual(expected);
        }),
      )
      .subscribe();
  }));
});
