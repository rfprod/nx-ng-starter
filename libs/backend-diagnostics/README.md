# backend-diagnostics

Diagnostics module for NestJS backends.

## Developer commands reference

```bash
npx nx run tools:help --search backend-diagnostics:
```

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

## References

- [Nx](https://nx.dev)
- [NestJS](https://nestjs.com)
