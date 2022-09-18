# Angular D3 Chart Components Module

This library was generated with [Nx](https://nx.dev).

## Description

The Angular chart components based on the [D3.js](https://d3js.org/) library.

Supported chart types:

- bar chart;
- line chart;
- pie chart;
- radar chart;
- force-directed chart;

The library contains Angular components as well as basic utility functions that can be used to implement the chart types mentioned above in TypeScript.

## Development commands reference

Run `nx test client-d3-charts` to execute the unit tests.

Run `nx lint client-d3-charts` to lint the library.

Run `nx build client-d3-charts` to build the library.

## Usage

### Within the development workspace

Import the charts module

```typescript
import { AppD3ChartsModule } from '@app/client-d3-charts';
```

### As an external package

Install the package

```bash
yarn add @rfprodz/client-d3-charts d3 @types/d3
```

Import the charts module

```typescript
import { AppD3ChartsModule } from '@rfprodz/client-d3-charts';
```

### Use the chart components

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
} from '@rfprodz/client-d3-charts';
```

### Chart examples

See the chart eamples components

```typescript
import { AppChartExamplesComponent } from '@rfprodz/client-d3-charts';
```

or the [source code](https://github.com/rfprod/nx-ng-starter/blob/main/libs/client-d3-charts/src/lib/components/chart-examples/chart-examples.component.ts) of the chart examples component
