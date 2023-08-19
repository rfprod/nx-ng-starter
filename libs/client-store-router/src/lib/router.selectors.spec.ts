import { TestBed, TestModuleMetadata } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppTestingComponent, getTestBedConfig, newTestBedMetadata } from '@app/client-testing-unit';
import { NavigationActionTiming, StoreRouterConnectingModule } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { first, firstValueFrom } from 'rxjs';

import { AppRouteSerializer } from './route.serializer';
import { IRouterState } from './router.interface';
import { routerSelector } from './router.selectors';

describe('routerSelector', () => {
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

  beforeEach(async () => {
    await TestBed.configureTestingModule(testBedConfig).compileComponents();
    store = TestBed.inject(Store);
    router = TestBed.inject(Router);
    await router.navigate(['root'], { queryParams: { test: 'test' } });
  });

  it('data', async () => {
    const data = await firstValueFrom(store.select(routerSelector.data).pipe(first()));
    expect(data).not.toBeUndefined();
  });

  it('queryParams', async () => {
    const data = await firstValueFrom(store.select(routerSelector.queryParams).pipe(first()));
    expect(data).not.toBeUndefined();
  });

  it('params', async () => {
    const data = await firstValueFrom(store.select(routerSelector.params).pipe(first()));
    expect(data).not.toBeUndefined();
  });

  it('url', async () => {
    const data = await firstValueFrom(store.select(routerSelector.url).pipe(first()));
    expect(data).not.toBeUndefined();
  });
});
