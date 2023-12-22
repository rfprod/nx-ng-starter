# Guided Tour Module for Angular

This library was generated with [Nx](https://nx.dev).

## Description

Guided tour feature for Angular clients.

## Usage

### Within the development workspace

Import the module

```typescript
...
import { AppGuidedTourModule } from '@app/client-guided-tour';

@NgModule({
  imports: [
    ...
    AppGuidedTourModule,
    ...
  ],
  ...
})
export class AppModule {}
```

### As an external package

#### Install the package

```bash
yarn add @rfprodz/client-guided-tour @angular/cdk @angular/common @angular/core @angular/material
```

#### Import the module

```typescript
...
import { AppGuidedTourModule } from '@rfprodz/client-guided-tour';

@NgModule({
  imports: [
    ...
    AppGuidedTourModule,
    ...
  ],
  ...
})
export class AppModule {}
```

#### Use in components

```html
...
<p>... Some content ...</p>

<div [appGuidedTour]="config.at(0)" [highlightElement]="false">first item to explain</div>

<p>... Some content ...</p>

<div [appGuidedTour]="config.at(1)" [highlightElement]="true">second item to explain</div>
...
```

```typescript
@Component({
  ...
  providers: [AppGuidedTourService], // <-- declare a service
  ...
})
export class GuidedComponent implements AfterViewInit {
  /** Locate steps. */
  @ViewChildren(AppGuidedTourDirective) public steps!: QueryList<AppGuidedTourDirective>;

  /** Configure the tour. */
  public tourConig$ = signal<IGuidedTourData[]>([
    {
      index: 0,
      title: 'first',
      subtitle: 'First step',
      description: 'The first step. Highlighting disabled.',
      first: true,
      last: false,
    },
    {
      index: 1,
      title: 'second',
      subtitle: 'Second step',
      description: 'The second step. Highlighting enabled.',
      first: false,
      last: true,
    },
  ]);

  constructor(public readonly tour: AppGuidedTourService) {}

  public ngAfterViewInit(): void {
    this.tour.configuration = this.steps; // <-- add steps to the service
  }
}
```

#### Full example

- [module](https://github.com/rfprod/nx-ng-starter/blob/main/libs/client-guided-tour/src/lib/guided-tour-example.module.ts)
- [component](https://github.com/rfprod/nx-ng-starter/tree/main/libs/client-guided-tour/src/lib/components/guided-tour-example)

## Developer commands reference

```bash
npx nx run tools:help --search client-guided-tour:
```

## References

- [Nx](https://nx.dev)
- [Angular](https://angular.io)
- [Angular Material](https://material.angular.io)
