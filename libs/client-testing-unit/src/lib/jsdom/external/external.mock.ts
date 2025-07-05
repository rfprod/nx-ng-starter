import { setupApolloUploadClientMock } from './apollo.mock';
import { setupD3JsMock } from './d3.mock';

export function setupExternalLibraryMocks() {
  setupD3JsMock();
  setupApolloUploadClientMock();
}
