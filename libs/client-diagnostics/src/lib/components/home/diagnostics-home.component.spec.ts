import { ComponentFixture, TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppMarkdownService } from '@app/client-services';
import { getTestBedConfig, newTestBedMetadata, spyOnObservables, TClassMemberObservableSpiesObject } from '@app/client-testing-unit';
import { of, tap } from 'rxjs';

import { AppDiagnosticsHomeComponent } from './diagnostics-home.component';

describe('AppDiagnosticsHomeComponent', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    declarations: [AppDiagnosticsHomeComponent],
    imports: [
      RouterTestingModule.withRoutes([
        { path: '', component: AppDiagnosticsHomeComponent },
        { path: '', redirectTo: '', pathMatch: 'full' },
        { path: '**', redirectTo: '' },
      ]),
    ],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let fixture: ComponentFixture<AppDiagnosticsHomeComponent>;
  let component: AppDiagnosticsHomeComponent;
  let componentSpy: TClassMemberObservableSpiesObject<AppDiagnosticsHomeComponent>;
  let service: AppMarkdownService;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppDiagnosticsHomeComponent);
        component = fixture.componentInstance;
        component.take = 2;
        componentSpy = spyOnObservables<AppDiagnosticsHomeComponent>(component);
        service = TestBed.inject(AppMarkdownService);
        fixture.detectChanges();
      });
  }));

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('markedInstructions should return processed markdown', waitForAsync(() => {
    const sub = of().subscribe();
    componentSpy.timer$.pipe.mockReturnValue(of(null));
    componentSpy.timer$.subscribe.mockReturnValue(sub);

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
