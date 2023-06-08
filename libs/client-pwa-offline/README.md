# PWA Offline Module for Angular

PWA offline feature for Angular clients.

## Description

Registers an interceptor that activates a view indicating that the client system if offline.

Registers a route that serves the view that is activated when the client system goes offline.

## Usage

### Within the development workspace

Import the module

```typescript
...
import { AppPwaOfflineModule } from '@app/client-pwa-offline';

@NgModule({
  imports: [
    ...
    AppPwaOfflineModule,
    ...
  ],
  ...
})
export class AppModule {}
```

### As an external package

Install the package

```bash
yarn add @rfprodz/client-pwa-offline @angular/material
```

Import the module

```typescript
...
import { AppPwaOfflineModule } from '@rfprodz/client-pwa-offline';

@NgModule({
  imports: [
    ...
    AppPwaOfflineModule,
    ...
  ],
  ...
})
export class AppModule {}
```

## Developer commands reference

```bash
npx nx run tools:help --search client-pwa-offline:
```

## References

- [Nx](https://nx.dev)
- [Angular](https://angular.io)
- [Angular Material](https://material.angular.io)
