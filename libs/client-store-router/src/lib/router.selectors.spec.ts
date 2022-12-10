import { TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppTestingComponent, getTestBedConfig, newTestBedMetadata } from '@app/client-testing-unit';
import { NavigationActionTiming, StoreRouterConnectingModule } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { first, firstValueFrom } from 'rxjs';

import { AppRouteSerializer } from './route.serializer';
import { IRouterState } from './router.interface';
import { routerSelectors } from './router.selectors';

describe('routerSelectors', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    imports: [
      RouterTestingModule.withRoutes([
        {
          path: 'root',
          component: AppTestingComponent,
          data: {
            test: 'test',
          },
        },
      ]),
      StoreRouterConnectingModule.forRoot({
        serializer: AppRouteSerializer,
        navigationActionTiming: NavigationActionTiming.PostActivation,
      }),
    ],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let store: Store<IRouterState>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule(testBedConfig)
      .compileComponents()
      .then(() => {
        store = TestBed.inject(Store);
        router = TestBed.inject(Router);
        return router.navigate(['root'], { queryParams: { test: 'test' } });
      });
  }));

  it('data', async () => {
    const data = await firstValueFrom(store.select(routerSelectors.data).pipe(first()));
    expect(data).not.toBeUndefined();
  });

  it('queryParams', async () => {
    const data = await firstValueFrom(store.select(routerSelectors.queryParams).pipe(first()));
    expect(data).not.toBeUndefined();
  });

  it('params', async () => {
    const data = await firstValueFrom(store.select(routerSelectors.params).pipe(first()));
    expect(data).not.toBeUndefined();
  });

  it('url', async () => {
    const data = await firstValueFrom(store.select(routerSelectors.url).pipe(first()));
    expect(data).not.toBeUndefined();
  });
});
