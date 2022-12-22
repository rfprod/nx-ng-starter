import { Directive, Input, OnChanges, SimpleChange, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';

import { IFeatureAccessState } from '../../feature-access.interface';
import { featureAccessSelectors } from '../../feature-access.selectors';

interface IInputChanges extends SimpleChanges {
  appFeatureFlag: SimpleChange;
}

@Directive({
  selector: '[appFeatureFlag]',
})
export class AppFeatureFlagDirective implements OnChanges {
  @Input() public appFeatureFlag?: string | null;

  constructor(
    private readonly viewContainer: ViewContainerRef,
    private readonly template: TemplateRef<unknown>,
    private readonly store: Store<IFeatureAccessState>,
  ) {}

  public ngOnChanges(changes: IInputChanges) {
    const value: string | null | undefined = changes.appFeatureFlag.currentValue;
    if (value === null) {
      this.viewContainer.createEmbeddedView(this.template);
      return;
    }
    const featureSelector =
      typeof value === 'undefined' || value === '' ? featureAccessSelectors.enable : featureAccessSelectors.enableFeature(value);
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
