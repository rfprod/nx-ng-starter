# backend-diagnostics

This library was generated with [Nx](https://nx.dev).

## Description

Diagnostics module for NestJS backends.

## Usage

Add to the root API module

```typescript
...
@Module({
  ...
  imports: [
    ...
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 10000,
        maxRedirects: 5,
      }),
    }),
    AppDiagnosticsModule.forRoot(),
    ...
  ],
  ...
})
export class AppApiModule {}
```

Add to the `main.ts` file

```typescript
/**
 * Express server.
 */
const server: e.Express = e();

...

async function bootstrap(expressInstance: e.Express): Promise<INestApplication> {
  const app = await NestFactory.create(AppApiModule, new ExpressAdapter(expressInstance));
  app.useWebSocketAdapter(new WsAdapter(app));

  ...

  return app.init();
}

void bootstrap(server);

```

### Examples

Example of using the diagnostics module in [the API application module](https://github.com/rfprod/nx-ng-starter/blob/main/apps/api/src/app/api.module.ts#L66)

## References

- [Nx](https://nx.dev)
- [NestJS](https://nestjs.com)
