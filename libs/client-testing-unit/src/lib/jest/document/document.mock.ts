function setupDocumentDoctypeMock() {
  Object.defineProperty(document, 'doctype', {
    value: '<!DOCTYPE html>',
    configurable: true,
  });
}

function setupDocumentTransformMock() {
  Object.defineProperty(document.body.style, 'transform', {
    value: () => ({
      enumerable: true,
      configurable: true,
    }),
    configurable: true,
  });
}

export function setupJsdomDocumentMocks() {
  setupDocumentDoctypeMock();
  setupDocumentTransformMock();
}
