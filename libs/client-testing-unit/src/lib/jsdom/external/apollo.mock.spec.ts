import { ApolloLink } from '@apollo/client/core';
import createUploadLink from 'apollo-upload-client/UploadHttpLink.mjs';

describe('setupApolloUploadClientMock', () => {
  it('should mock ApolloLink when calling createUploadLink', () => {
    const link = new createUploadLink();
    expect(link).toBeInstanceOf(ApolloLink);
  });
});
