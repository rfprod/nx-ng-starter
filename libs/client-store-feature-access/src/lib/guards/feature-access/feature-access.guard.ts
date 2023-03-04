import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { first, map, Observable } from 'rxjs';

import { IFeatureAccessState } from '../../feature-access.interface';
import { featureAccessSelectors } from '../../feature-access.selectors';

@Injectable({
  providedIn: 'root',
})
export class AppFeatureAccessGuard {
  constructor(private readonly router: Router, private readonly store: Store<IFeatureAccessState>) {}

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    const value: string | undefined = (<{ feature?: string }>state.root.data).feature;
    const featureSelector =
      typeof value === 'undefined' || value === '' ? featureAccessSelectors.enable : featureAccessSelectors.enableFeature(value);
    return this.store.select(featureSelector).pipe(
      first(),
      map(enable => (enable ? enable : this.router.createUrlTree(['']))),
    );
  }
}
