import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { featureAccessActions } from '../../feature-access.actions';
import { IFeatureAccessState } from '../../feature-access.interface';

@Injectable({
  providedIn: 'root',
})
export class AppFeatureAccessInitGuard {
  constructor(private readonly store: Store<IFeatureAccessState>) {}

  public canActivate(): boolean {
    this.store.dispatch(featureAccessActions.initialize());
    return true;
  }
}
