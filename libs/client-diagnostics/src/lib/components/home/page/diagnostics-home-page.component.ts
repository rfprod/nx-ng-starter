import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { trackChanges } from '@app/client-util';

interface IAppHomePageChanges extends SimpleChanges {
  timer: SimpleChange;
  markedInstructions: SimpleChange;
}

@Component({
  selector: 'app-diagnostics-home-page',
  templateUrl: './diagnostics-home-page.component.html',
  styleUrls: ['./diagnostics-home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppDiagnosticsHomePage implements OnChanges {
  @Input() public timer = '';

  @Input() public markedInstructions = '';

  @trackChanges<AppDiagnosticsHomePage, string>('timer', 'timerChanges')
  public ngOnChanges(changes: IAppHomePageChanges) {
    return changes;
  }

  public timerChanges(value?: string): void {
    const index = parseInt(value?.replace(/[a-zA-Z\s]/gi, '') ?? '', 10);
    const divisor = 2;
    this.timer = index % divisor ? `The timer is freaking out ${Math.pow(divisor, index)}` : value ?? '';
  }
}
