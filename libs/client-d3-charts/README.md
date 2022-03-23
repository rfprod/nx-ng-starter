# Angular D3 chart components

This library was generated with [Nx](https://nx.dev).

## Development commands reference

Run `nx test client-d3-charts` to execute the unit tests.

Run `nx lint client-d3-charts` to lint the library.

Run `nx build client-d3-charts` to build the library.

## Usage

### Within the development workspace

Import the charts module

```typescript
import { AppClientD3ChartsModule } from '@app/client-d3-charts';
```

### As an external package

Install the package

```bash
yarn add @rfprodz/d3-charts d3 @types/d3
```

Import the charts module

```typescript
import { AppClientD3ChartsModule } from '@rfprodz/d3-charts';
```

### Use chart components

#### in templates

```html
<!-- bar chart -->
<app-bar-chart></app-bar-chart>
<!-- line chart -->
<app-line-chart></app-line-chart>
<!-- pie chart -->
<app-pie-chart></app-pie-chart>
<!-- radar chart -->
<app-radar-chart></app-radar-chart>
<!-- force-directed chart -->
<app-force-directed-chart></app-force-directed-chart>
```

#### in classes

```typescript
import {
  AppPieChartComponent,
  AppRadarChartComponent,
  AppForceDirectedChartComponent,
  AppBarChartComponent,
  AppLineChartComponent,
} from '@rfprodz/d3-charts';
```

### See the chart examples component

```typescript
import { AppChartExamplesComponent } from '@rfprodz/d3-charts';
```
