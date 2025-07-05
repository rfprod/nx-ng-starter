import { ApolloLink } from '@apollo/client/core';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';

describe('setupApolloUploadClientMock', () => {
  it('should mock ApolloLink when calling createUploadLink', () => {
    const link = createUploadLink();
    expect(link).toBeInstanceOf(ApolloLink);
  });
});
