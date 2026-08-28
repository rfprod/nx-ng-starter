import { ApolloLink } from '@apollo/client/core';
import { vi } from 'vitest';

/**
 * Sets up the Apollo Uload Client mock.
 */
export function setupApolloUploadClientMock() {
  vi.mock('apollo-upload-client/UploadHttpLink.mjs', () => ({
    ['__esModule']: true,
    default: class AppUploadHttpLink extends ApolloLink {
      constructor(options?: ApolloLink.RequestHandler) {
        super();
      }
    },
  }));
}
