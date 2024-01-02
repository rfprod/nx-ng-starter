import { ApolloLink } from '@apollo/client/core';

/**
 * Sets up the Apollo Uload Client mock.
 */
export function setupApolloUploadClientMock() {
  jest.mock('apollo-upload-client/createUploadLink.mjs', () => ({
    __esModule: true,
    default: () => new ApolloLink(),
  }));
}
