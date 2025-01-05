import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { first, map, Observable } from 'rxjs';

import { IFeatureAccessState } from '../../feature-access.interface';
import { featureAccessSelector } from '../../feature-access.selectors';

@Injectable({
  providedIn: 'root',
})
export class AppFeatureAccessGuard {
  constructor(
    private readonly router: Router,
    private readonly store: Store<IFeatureAccessState>,
  ) {}

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    const value: string | undefined = (state.root.data as { feature?: string }).feature;
    const featureSelector =
      typeof value === 'undefined' || value === '' ? featureAccessSelector.enable : featureAccessSelector.enableFeature(value);
    return this.store.select(featureSelector).pipe(
      first(),
      map(enable => (enable ? enable : this.router.createUrlTree(['']))),
    );
  }
}
