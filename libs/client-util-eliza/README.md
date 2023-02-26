# Angular Eliza Chatbot Module

This library was generated with [Nx](https://nx.dev).

## Description

The Angular chatbot service based on an early natural language processing program called Eliza.

> ELIZA is an early natural language processing computer program created from 1964 to 1966 at the MIT Artificial Intelligence Laboratory by Joseph Weizenbaum. Created to demonstrate the superficiality of communication between humans and machines, Eliza simulated conversation by using a "pattern matching" and substitution methodology that gave users an illusion of understanding on the part of the program, but had no built in framework for contextualizing events.

Source and more information about the Elisa program: [https://en.wikipedia.org/wiki/ELIZA](https://en.wikipedia.org/wiki/ELIZA)

## Usage

### Within the development workspace

Import the charts module

```typescript
import { AppElizaModule } from '@app/client-util-eliza';
```

Example [client.module.ts](https://github.com/rfprod/nx-ng-starter/blob/main/apps/client/src/app/client.module.ts#L52)

### As an external package

Install the package

```bash
yarn add @rfprodz/client-util-eliza
```

#### With the default configuration

Import in your application root module

```typescript
import { AppElizaModule } from '@rfprodz/client-util-eliza';

@NgModule({
...
  imports: [
    ...
    AppElizaModule.forRoot(),
    ...
  ],
...
})
export class AppModule {
  ...
}
```

#### With a custom configuration

Import in your application root module

```typescript
import { AppElizaModule, IElizaData } from '@rfprodz/client-util-eliza';

const customElizaData: IElizaData = {
  ...
};

@NgModule({
...
  imports: [
    ...
    AppElizaModule.forRoot(customElizaData),
    ...
  ],
...
})
export class AppModule {
  ...
}
```

### Chatbot component

Example [chatbot-root.component.ts](https://github.com/rfprod/nx-ng-starter/blob/main/libs/client-chatbot/src/lib/components/chatbot-root/chatbot-root.component.ts)

## Developer commands reference

```bash
npx nx run tools:help --search client-util-eliza:
```

## References

- [Nx](https://nx.dev)
- [Angular](https://angular.io)
- [Eliza program](https://en.wikipedia.org/wiki/ELIZA)
