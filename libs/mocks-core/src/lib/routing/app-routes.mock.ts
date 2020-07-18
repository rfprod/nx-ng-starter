import { Routes } from '@angular/router';

import { AppDummyComponent } from '../components/dummy/dummy.component.mock';

/**
 * Mocked application routes.
 */
const routes: Routes = [
  {
    path: 'passport',
    component: AppDummyComponent,
  },
  {
    path: 'orders',
    children: [
      {
        path: 'carrier',
        children: [
          {
            path: '',
            component: AppDummyComponent,
            data: {
              title: 'carrier orders table',
              color: 'primary',
              displayConfig: true,
              filterOrderStatus: null,
            },
          },
          {
            path: ':id',
            component: AppDummyComponent,
            data: {
              title: 'order',
              order: null,
              predefinedOrderAction: null,
            },
          },
          {
            path: 'auction/:id',
            component: AppDummyComponent,
            data: {
              title: 'auction',
              order: null,
              predefinedOrderAction: null,
            },
          },
          { path: '**', redirectTo: '/orders/carrier' },
        ],
      },
      {
        path: 'owner',
        children: [
          {
            path: '',
            component: AppDummyComponent,
            data: {
              title: 'owner orders table',
              color: 'primary',
              displayConfig: true,
              filterOrderStatus: null,
            },
          },
          {
            path: ':id',
            component: AppDummyComponent,
            data: {
              title: 'order',
              dialogData: null,
            },
          },
          {
            path: 'auction/:id',
            component: AppDummyComponent,
            data: {
              title: 'auction',
              dialogData: null,
            },
          },
          { path: '**', redirectTo: '/orders/owner' },
        ],
      },
    ],
  },
  { path: '**', redirectTo: 'passport' },
];

/**
 * Exported mocked application routes getter.
 */
export const mockedAppRoutes: () => Routes = () => routes.slice();
