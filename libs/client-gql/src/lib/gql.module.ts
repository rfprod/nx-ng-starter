import { ModuleWithProviders, NgModule } from '@angular/core';
import { ApolloClientOptions, InMemoryCache, split } from '@apollo/client/core';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { IWebClientAppEnvironment } from '@app/client-util';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';

/**
 * Creates apollo links: http, ws.
 */
export function getApolloLinks(env: IWebClientAppEnvironment, httpLink: HttpLink) {
  const http = httpLink.create({
    uri: `${env.api}graphql`,
  });

  const ws = new WebSocketLink({
    uri: `${env.api.replace(/http/, 'ws')}/`,
    options: {
      reconnect: true,
    },
  });

  return { http, ws };
}

export function apolloOptionsFactory(env: IWebClientAppEnvironment, httpLink: HttpLink): ApolloClientOptions<Record<string, unknown>> {
  // apollo links
  const links = getApolloLinks(env, httpLink);

  // using the ability to split links, you can send data to each link
  // depending on what kind of operation is being sent
  const link = split(
    // split based on operation type
    ({ query }) => {
      const definition = getMainDefinition(query);
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    },
    links.ws,
    links.http,
  );

  return {
    link,
    cache: new InMemoryCache(),
  };
}

@NgModule({})
export class AppGqlModule {
  public static forRoot(env: IWebClientAppEnvironment): ModuleWithProviders<AppGqlModule> {
    return {
      ngModule: AppGqlModule,
      providers: [
        {
          provide: APOLLO_OPTIONS,
          useFactory: (httpLink: HttpLink) => apolloOptionsFactory(env, httpLink),
          deps: [HttpLink],
        },
      ],
    };
  }
}
