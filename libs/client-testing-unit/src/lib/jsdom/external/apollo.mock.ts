import { ApolloLink } from '@apollo/client/core';
import { vi } from 'vitest';

/**
 * Sets up the Apollo Uload Client mock.
 */
export function setupApolloUploadClientMock() {
  vi.mock('apollo-upload-client/createUploadLink.mjs', () => ({
    ['__esModule']: true,
    default: () => new ApolloLink(),
  }));
}
