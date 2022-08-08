import { ActivatedRouteSnapshot, convertToParamMap, RouterStateSnapshot } from '@angular/router';

import { AppRouteSerializer } from './route.serializer';

describe('AppRouteSerializer', () => {
  let serializer: AppRouteSerializer;

  beforeEach(() => {
    serializer = new AppRouteSerializer();
  });

  it('should serialize route as expected', () => {
    const snapshot: RouterStateSnapshot = {
      root: {
        children: [],
        firstChild: {
          children: [],
          firstChild: null,
          component: null,
          data: {},
          fragment: null,
          outlet: 'primary',
          paramMap: convertToParamMap({}),
          params: {},
          parent: null,
          pathFromRoot: [],
          queryParamMap: convertToParamMap({}),
          queryParams: {},
          root: new ActivatedRouteSnapshot(),
          url: [],
          routeConfig: null,
        },
        component: null,
        data: {},
        fragment: null,
        outlet: 'primary',
        paramMap: convertToParamMap({}),
        params: {},
        parent: null,
        pathFromRoot: [],
        queryParamMap: convertToParamMap({}),
        queryParams: {},
        root: new ActivatedRouteSnapshot(),
        url: [],
        routeConfig: null,
      },
      url: '',
    };
    const serialized = serializer.serialize(snapshot);
    const expectedObject = {
      url: expect.any(String),
      params: expect.any(Object),
      queryParams: expect.any(Object),
    };
    expect(serialized).toMatchObject(expectedObject);
  });
});
