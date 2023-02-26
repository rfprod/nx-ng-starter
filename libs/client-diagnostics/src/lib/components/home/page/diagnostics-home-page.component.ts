import { ChangeDetectionStrategy, Component, Input, OnChanges, SecurityContext, SimpleChange, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TDiagnosticData } from '@app/client-store-diagnostics';
import { trackChanges } from '@app/client-util';

interface IAppHomePageChanges extends SimpleChanges {
  markedInstructions: SimpleChange;
}

@Component({
  selector: 'app-diagnostics-home-page',
  templateUrl: './diagnostics-home-page.component.html',
  styleUrls: ['./diagnostics-home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppDiagnosticsHomePage implements OnChanges {
  @Input() public users: number | null = null;

  @Input() public markedInstructions: string | null = null;

  @Input() public staticData: TDiagnosticData[] | null = null;

  @Input() public dynamicData: TDiagnosticData[] | null = null;

  constructor(private readonly sanitizer: DomSanitizer) {}

  @trackChanges<AppDiagnosticsHomePage, string>('markedInstructions', 'markedInstructionsChanges')
  public ngOnChanges(changes: IAppHomePageChanges) {
    return changes;
  }

  public markedInstructionsChanges(value: string): void {
    this.markedInstructions = this.sanitizer.sanitize(SecurityContext.HTML, `${value}\n\n<small> Sanitized with DOM Sanitizer.</small>`);
  }
}
