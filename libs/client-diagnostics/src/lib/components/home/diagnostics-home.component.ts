import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppMarkdownService } from '@app/client-services';
import { diagnosticsSelectors, IDiagnosticsState } from '@app/client-store-diagnostics';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { first, map } from 'rxjs/operators';

@Component({
  selector: 'app-diagnostics-home',
  templateUrl: './diagnostics-home.component.html',
  styleUrls: ['./diagnostics-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppDiagnosticsHomeComponent {
  public readonly markedInstructions$ = of('').pipe(
    first(),
    map(() => {
      const sidenavInstruction =
        'Open **sidenav** by clicking the **icon** button in the left corner of the browser window, and select an item.';
      const markdownInstructions = '# You can use Markdown \n\n via AppMarkdownService, just like in this example.';
      return this.markdown.process(`${sidenavInstruction}\n${markdownInstructions}`);
    }),
  );

  public readonly staticData$ = this.store.select(diagnosticsSelectors.staticData);

  public readonly dynamicData$ = this.store.select(diagnosticsSelectors.dynamicData);

  public readonly users$ = this.store.select(diagnosticsSelectors.users);

  constructor(private readonly markdown: AppMarkdownService, private readonly store: Store<IDiagnosticsState>) {}
}
