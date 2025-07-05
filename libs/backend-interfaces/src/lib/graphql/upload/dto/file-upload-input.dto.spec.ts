import type { FileUpload } from 'graphql-upload/processRequest.mjs';

import { AppFileUploadInputDto } from './file-upload-input.dto';

describe('AppFileUploadInputDto', () => {
  it('should create an instance with default values', () => {
    const input = new AppFileUploadInputDto();
    expect(input.filename).toBe('');
    expect(input.mimetype).toBe('');
    expect(input.encoding).toBe('');
  });

  it('should allow setting properties', () => {
    const input = new AppFileUploadInputDto();
    input.filename = 'test-file.txt';
    input.mimetype = 'text/plain';
    input.encoding = '7bit';

    expect(input.filename).toBe('test-file.txt');
    expect(input.mimetype).toBe('text/plain');
    expect(input.encoding).toBe('7bit');
  });

  it('should implement Partial<FileUpload>', () => {
    const input: Partial<FileUpload> = new AppFileUploadInputDto();
    input.filename = 'example.txt';
    input.mimetype = 'application/pdf';
    input.encoding = 'utf-8';

    expect(input).toHaveProperty('filename', 'example.txt');
    expect(input).toHaveProperty('mimetype', 'application/pdf');
    expect(input).toHaveProperty('encoding', 'utf-8');
  });
});
