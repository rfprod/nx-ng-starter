import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHomePage {
  @Input() public timer = '';

  @Input() public markedInstructions = '';
}
