import { Routes } from '@angular/router';
import { DummyComponent } from '../components/dummy.component.mock';

/**
 * Mocked application routes.
 */
const routes: Routes = [
  {
    path: 'passport',
    component: DummyComponent,
  },
  {
    path: 'orders',
    children: [
      {
        path: 'carrier',
        children: [
          {
            path: '',
            component: DummyComponent,
            data: {
              title: 'carrier orders table',
              color: 'primary',
              displayConfig: true,
              filterOrderStatus: null,
            },
          },
          {
            path: ':id',
            component: DummyComponent,
            data: {
              title: 'order',
              order: null,
              predefinedOrderAction: null,
            },
          },
          {
            path: 'auction/:id',
            component: DummyComponent,
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
            component: DummyComponent,
            data: {
              title: 'owner orders table',
              color: 'primary',
              displayConfig: true,
              filterOrderStatus: null,
            },
          },
          {
            path: ':id',
            component: DummyComponent,
            data: {
              title: 'order',
              dialogData: null,
            },
          },
          {
            path: 'auction/:id',
            component: DummyComponent,
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
