import { AfterViewInit, ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatProgressBar } from '@angular/material/progress-bar';

@Component({
  selector: 'app-global-progress-bar',
  templateUrl: './global-progress-bar.component.html',
  styleUrls: ['./global-progress-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppGlobalProgressBarComponent implements AfterViewInit {
  @ViewChild(MatProgressBar) public progressBar?: MatProgressBar;

  public ngAfterViewInit() {
    if (typeof this.progressBar !== 'undefined') {
      this.progressBar._elementRef.nativeElement.style.width = `${document.body.clientWidth}px`;
    }
  }
}
