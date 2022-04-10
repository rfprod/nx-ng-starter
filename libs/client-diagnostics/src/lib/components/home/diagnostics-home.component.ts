import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppMarkdownService } from '@app/client-services';
import { of, timer } from 'rxjs';
import { first, map, takeWhile } from 'rxjs/operators';

const timeout = {
  start: 0,
  interval: 2000,
};

@Component({
  selector: 'app-diagnostics-home',
  templateUrl: './diagnostics-home.component.html',
  styleUrls: ['./diagnostics-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppDiagnosticsHomeComponent {
  public take = Number(Infinity);

  public readonly timer$ = timer(timeout.start, timeout.interval).pipe(
    takeWhile(i => i.valueOf() <= this.take),
    map(num => `Until destroyed ${num}`),
  );

  public readonly markedInstructions$ = of('').pipe(
    first(),
    map(() => {
      const sidenavInstruction =
        'Open **sidenav** by clicking the **icon** button in the left corner of the browser window, and select an item.';
      const markdownInstructions = '# You can use Markdown \n\n via AppMarkdownService, just like in this example.';
      return this.markdown.process(`${sidenavInstruction}\n${markdownInstructions}`);
    }),
  );

  constructor(private readonly markdown: AppMarkdownService) {}
}
