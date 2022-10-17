import { ComponentFixture, TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { getTestBedConfig, newTestBedMetadata } from '@app/client-testing-unit';
import { AppElizaModule } from '@app/client-util-eliza';
import { tap } from 'rxjs';

import { AppChatbotRootComponent } from './chatbot-root.component';

describe('AppChatbotRootComponent', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    imports: [AppElizaModule.forRoot()],
    declarations: [AppChatbotRootComponent],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let fixture: ComponentFixture<AppChatbotRootComponent>;
  let component: AppChatbotRootComponent;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppChatbotRootComponent);
        component = fixture.debugElement.componentInstance;

        fixture.detectChanges();
      });
  }));

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('messages$ should correct initial value', waitForAsync(() => {
    void component.messages$
      .pipe(
        tap(messages => {
          const expected = [{ bot: true, text: expect.any(String) }];
          expect(messages).toEqual(expected);
        }),
      )
      .subscribe();
  }));
});
