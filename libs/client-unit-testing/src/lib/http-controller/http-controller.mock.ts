import { HttpRequest } from '@angular/common/http';
import { HttpTestingController, RequestMatch, TestRequest } from '@angular/common/http/testing';

export type THttpRequestMatcher<T> = string | RequestMatch | ((req: HttpRequest<T>) => boolean);

/**
 * This function should be used in unit tests to flush HttpTestingController requests.
 */
export function flushHttpRequests<T>(
  httpController: HttpTestingController,
  verify = false,
  matcher: THttpRequestMatcher<T> = (req: HttpRequest<T>): boolean => true,
  responseData:
    | string
    | number
    | Record<string, unknown>
    | ArrayBuffer
    | Blob
    | (string | number | Record<string, unknown> | null)[]
    | null = {},
  produceError = false,
): void {
  httpController.match(matcher).forEach((req: TestRequest) => {
    return !req.cancelled ? (produceError ? req.error(new ErrorEvent('error', { error: responseData })) : req.flush(responseData)) : null;
  });
  if (verify) {
    httpController.verify();
  }
}
