import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { DOC_APP_ENV, IDocAppEnvironment } from '../../interfaces/environment.interface';

@Component({
  selector: 'app-documentation-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppDocRootComponent implements OnInit {
  public inlineTitle = this.env.appName;

  constructor(private readonly title: Title, @Inject(DOC_APP_ENV) private readonly env: IDocAppEnvironment) {}

  public ngOnInit(): void {
    this.title.setTitle(this.env.appName ?? '');
  }
}
