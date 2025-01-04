import { signal } from '@angular/core';
import { type ComponentFixture, TestBed, type TestModuleMetadata } from '@angular/core/testing';
import { getTestBedConfig, newTestBedMetadata } from '@app/client-testing-unit';
import { AppElizaService, type IChatMessage } from '@app/client-util-eliza';

import { AppChatbotRootComponent } from './chatbot-root.component';

class AppElizaMock {
  public messages$ = signal<IChatMessage[]>([{ bot: true, text: 'test' }]);

  public reset() {
    this.messages$.set([{ bot: true, text: 'test' }]);
  }

  public nextMessage(msg: IChatMessage) {
    this.messages$.update(value => {
      const next = [...value];
      next.push(msg);
      return next;
    });
  }
}

describe('AppChatbotRootComponent', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    declarations: [AppChatbotRootComponent],
    providers: [
      {
        provide: AppElizaService,
        useClass: AppElizaMock,
      },
    ],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let fixture: ComponentFixture<AppChatbotRootComponent>;
  let component: AppChatbotRootComponent;
  let eliza: AppElizaService;

  beforeEach(async () => {
    await TestBed.configureTestingModule(testBedConfig).compileComponents();
    fixture = TestBed.createComponent(AppChatbotRootComponent);
    component = fixture.debugElement.componentInstance;
    eliza = TestBed.inject(AppElizaService);
    fixture.detectChanges();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('messages$ should correct initial value', () => {
    const messages = component.messages$();
    const expected = [{ bot: true, text: expect.any(String) }];
    expect(messages).toEqual(expected);
  });

  it('resetBot should reset eliza and enable form', () => {
    const spy = {
      reset: jest.spyOn(eliza, 'reset'),
      enable: jest.spyOn(component.form, 'enable'),
    };
    component.resetBot();
    expect(spy.reset).toHaveBeenCalledTimes(1);
    expect(spy.enable).toHaveBeenCalledTimes(1);
  });

  it('botResponse should add a message to the messages array', () => {
    const nextMessage = jest.spyOn(eliza, 'nextMessage');
    const previousCount = eliza.messages$().length;
    component.botResponse('next msg');
    const nextCount = eliza.messages$().length;
    expect(nextMessage).toHaveBeenCalledTimes(1);
    expect(nextCount - previousCount).toEqual(1);
  });

  it('userMessage should add a message to the messages array', () => {
    let messages = 1;
    expect(component.messages$().length).toEqual(messages);
    const spy = {
      nextMessage: jest.spyOn(eliza, 'nextMessage'),
      reset: jest.spyOn(component.form, 'reset'),
    };
    component.form.controls.message.patchValue('test');
    component.form.controls.message.updateValueAndValidity();
    component.userMessage();
    expect(spy.nextMessage).toHaveBeenCalledTimes(1);
    expect(spy.reset).toHaveBeenCalledTimes(1);
    messages += 1;
    expect(component.messages$().length).toEqual(messages);
  });

  it('keyUp handler should call userMessage on CTRL+Enter press', () => {
    const userMessage = jest.spyOn(component, 'userMessage');
    const event: KeyboardEvent = new KeyboardEvent('keyup', { ctrlKey: true, key: 'Enter' });
    component.keyUp(event);
    expect(userMessage).toHaveBeenCalledTimes(1);
  });
});
