import { ComponentFixture, TestBed, TestModuleMetadata } from '@angular/core/testing';
import { getTestBedConfig, newTestBedMetadata } from '@app/client-testing-unit';
import { AppElizaModule } from '@app/client-util-eliza';

import { AppChatbotWidgetRootComponent } from './chatbot-widget-root.component';

describe('AppChatbotWidgetRootComponent', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    imports: [AppElizaModule.forRoot()],
    declarations: [AppChatbotWidgetRootComponent],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let fixture: ComponentFixture<AppChatbotWidgetRootComponent>;
  let component: AppChatbotWidgetRootComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule(testBedConfig).compileComponents();
    fixture = TestBed.createComponent(AppChatbotWidgetRootComponent);
    component = fixture.debugElement.componentInstance;
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
});
