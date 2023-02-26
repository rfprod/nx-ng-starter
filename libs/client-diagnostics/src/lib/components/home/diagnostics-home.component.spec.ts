import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { AppMarkdownService } from '@app/client-services';
import { newTestBedMetadata } from '@app/client-testing-unit';
import { Store } from '@ngrx/store';
import { marked } from 'marked';
import { of, tap } from 'rxjs';

import { AppDiagnosticsHomeComponent } from './diagnostics-home.component';

describe('AppDiagnosticsHomeComponent', () => {
  const testBedConfig: TestModuleMetadata = newTestBedMetadata({
    declarations: [AppDiagnosticsHomeComponent],
    providers: [
      {
        provide: AppMarkdownService,
        useValue: {
          process: (input: string) => marked(input),
        },
      },
      {
        provide: Store,
        useValue: {
          select: () =>
            of({
              users: 1,
              staticData: [],
              dynamicData: [],
            }),
        },
      },
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  });

  let fixture: ComponentFixture<AppDiagnosticsHomeComponent>;
  let component: AppDiagnosticsHomeComponent;

  let service: AppMarkdownService;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppDiagnosticsHomeComponent);
        component = fixture.componentInstance;

        service = TestBed.inject(AppMarkdownService);
        fixture.detectChanges();
      });
  }));

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('markedInstructions should return processed markdown', waitForAsync(() => {
    const sidenavInstruction =
      'Open **sidenav** by clicking the **icon** button in the left corner of the browser window, and select an item.';
    const markdownInstructions = '# You can use Markdown \n\n via AppMarkdownService, just like in this example.';
    const expected = service.process(`${sidenavInstruction}\n${markdownInstructions}`);
    void component.markedInstructions$
      .pipe(
        tap(instructions => {
          expect(instructions).toEqual(expected);
        }),
      )
      .subscribe();
  }));
});
