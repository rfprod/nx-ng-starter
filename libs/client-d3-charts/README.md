# Angular D3 chart components

This library was generated with [Nx](https://nx.dev).

## Usage

### As an external package

Install the package

```bash
yarn add @nx-ng-starter/d3-charts
```

Import the charts module

```typescript
import { AppClientD3ChartsModule } from '@rfprodz/d3-charts';
```

### Within the development workspace

Import the charts module

```typescript
import { AppClientD3ChartsModule } from '@app/client-d3-charts';
```

Use chart components in templates

```html
<!-- bar chart -->
<app-bar-chart></app-bar-chart>
<!-- pie chart -->
<app-pie-chart></app-pie-chart>
<!-- radar chart -->
<app-radar-chart></app-radar-chart>
<!-- force-directed chart -->
<app-force-directed-chart></app-force-directed-chart>
```

Use chart components in classes

```typescript
import {
  AppPieChartComponent,
  AppRadarChartComponent,
  AppForceDirectedChartComponent,
  AppBarChartComponent,
} from '@nx-ng-starter/d3-charts';
```

## Commands reference

Run `nx test client-d3-charts` to execute the unit tests.

Run `nx lint client-d3-charts` to lint the library.

Run `nx build client-d3-charts` to build the library.
