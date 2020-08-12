import { ModuleWithProviders, NgModule } from '@angular/core';
import { ApolloClientOptions, InMemoryCache, split } from '@apollo/client/core';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { IWebClientAppEnvironment } from '@nx-ng-starter/client-util';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';

@NgModule({})
export class AppClientGqlModule {
  public static forRoot(env: IWebClientAppEnvironment): ModuleWithProviders<AppClientGqlModule> {
    return {
      ngModule: AppClientGqlModule,
      providers: [
        {
          provide: APOLLO_OPTIONS,
          useFactory(httpLink: HttpLink): ApolloClientOptions<Record<string, unknown>> {
            // Create an http link:
            const http = httpLink.create({
              uri: `${env.api}graphql`,
            });

            // Create a WebSocket link:
            const ws = new WebSocketLink({
              uri: `${env.api.replace(/http/, 'ws')}/`,
              options: {
                reconnect: true,
              },
            });

            // using the ability to split links, you can send data to each link
            // depending on what kind of operation is being sent
            const link = split(
              // split based on operation type
              ({ query }) => {
                const definition = getMainDefinition(query);
                return (
                  definition.kind === 'OperationDefinition' &&
                  definition.operation === 'subscription'
                );
              },
              ws,
              http,
            );

            return {
              link,
              cache: new InMemoryCache(),
            };
          },
          deps: [HttpLink],
        },
      ],
    };
  }
}
