function setupDocumentDoctypeMock() {
  Object.defineProperty(document, 'doctype', {
    value: '<!DOCTYPE html>',
  });
}

function setupDocumentTransformMock() {
  Object.defineProperty(document.body.style, 'transform', {
    value: () => {
      return {
        enumerable: true,
        configurable: true,
      };
    },
  });
}

export function setupJsdomDocumentMocks() {
  setupDocumentDoctypeMock();
  setupDocumentTransformMock();
}
