import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';

import { featureAccessActions } from '../../feature-access.actions';
import { IFeatureAccessState } from '../../feature-access.interface';

@Injectable({
  providedIn: 'root',
})
export class AppFeatureAccessInitGuard implements CanActivate {
  constructor(private readonly store: Store<IFeatureAccessState>) {}

  public canActivate(): boolean {
    this.store.dispatch(featureAccessActions.initialize());
    return true;
  }
}
