import { setupApolloUploadClientMock } from './apollo.mock';
import { setupD3JsMock } from './d3.mock';

export function setupJestExternalLibraryMocks() {
  setupD3JsMock();
  setupApolloUploadClientMock();
}
