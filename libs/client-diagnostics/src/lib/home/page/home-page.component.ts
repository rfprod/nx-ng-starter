import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { trackChanges } from '@nx-ng-starter/client-util';

interface IAppHomePageChanges extends SimpleChanges {
  timer: SimpleChange;
  markedInstructions: SimpleChange;
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHomePage implements OnChanges {
  @Input() public timer = '';

  @Input() public markedInstructions = '';

  @trackChanges<AppHomePage, string>('timer', 'timerChanges')
  public ngOnChanges(changes: IAppHomePageChanges) {
    return changes;
  }

  public timerChanges(value: string): void {
    const index = parseInt((value ?? '').replace(/[a-z\s]/gi, ''), 10);
    const divisor = 2;
    this.timer = index % divisor ? `The timer is freaking out ${Math.pow(divisor, index)}` : value;
  }
}
