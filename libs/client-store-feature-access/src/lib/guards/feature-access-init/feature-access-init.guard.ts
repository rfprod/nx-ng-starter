import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { featureAccessAction } from '../../feature-access.actions';
import { IFeatureAccessState } from '../../feature-access.interface';

@Injectable({
  providedIn: 'root',
})
export class AppFeatureAccessInitGuard {
  constructor(private readonly store: Store<IFeatureAccessState>) {}

  public canActivate(): boolean {
    this.store.dispatch(featureAccessAction.initialize());
    return true;
  }
}
