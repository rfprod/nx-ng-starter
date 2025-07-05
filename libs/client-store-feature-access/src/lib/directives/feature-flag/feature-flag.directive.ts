import { Directive, inject, Input, OnChanges, SimpleChange, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';

import { IFeatureAccessState } from '../../feature-access.interface';
import { featureAccessSelector } from '../../feature-access.selectors';

interface IInputChanges extends SimpleChanges {
  appFeatureFlag: SimpleChange;
}

@Directive({
  selector: '[appFeatureFlag]',
  standalone: false,
})
export class AppFeatureFlagDirective implements OnChanges {
  private readonly viewContainer = inject(ViewContainerRef);

  private readonly template = inject(TemplateRef<unknown>);

  private readonly store = inject(Store<IFeatureAccessState>);

  @Input() public appFeatureFlag?: string | null;

  public ngOnChanges(changes: IInputChanges) {
    const value: string | null | undefined = changes.appFeatureFlag.currentValue;
    if (value === null) {
      this.viewContainer.createEmbeddedView(this.template);
      return;
    }
    const featureSelector =
      typeof value === 'undefined' || value === '' ? featureAccessSelector.enable : featureAccessSelector.enableFeature(value);
    void this.store
      .select(featureSelector)
      .pipe(
        tap(flagValue => {
          if (flagValue) {
            this.viewContainer.createEmbeddedView(this.template);
          }
        }),
      )
      .subscribe();
  }
}
