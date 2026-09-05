import '@apollo/client';

declare module '@apollo/client' {
  namespace ApolloClient {
    /**
     * @documentation https://www.apollographql.com/docs/react/data/typescript#how-to-declare-default-options
     */
    namespace DeclareDefaultOptions {
      interface WatchQuery {
        errorPolicy: 'all';
      }

      interface Query {
        errorPolicy: 'all';
      }

      interface Mutate {
        errorPolicy: 'all';
      }
    }
  }
}
