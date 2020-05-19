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
  responseData: unknown = {},
): void {
  httpController
    .match(matcher)
    .forEach((req: TestRequest) => (!req.cancelled ? req.flush(responseData) : null));
  if (verify) {
    httpController.verify();
  }
}
