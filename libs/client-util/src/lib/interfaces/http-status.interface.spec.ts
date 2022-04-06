import { HTTP_STATUS } from './http-status.interface';

const statusCode = {
  success: 200,
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  internalServerError: 500,
  notImplemented: 501,
  badGateway: 502,
  serviceUnavailable: 503,
};

describe('HTTP_STATUS', () => {
  it('should have correct http status codes', () => {
    expect(HTTP_STATUS.SUCCESS).toEqual(statusCode.success);
    expect(HTTP_STATUS.BAD_REQUEST).toEqual(statusCode.badRequest);
    expect(HTTP_STATUS.UNAUTHORIZED).toEqual(statusCode.unauthorized);
    expect(HTTP_STATUS.FORBIDDEN).toEqual(statusCode.forbidden);
    expect(HTTP_STATUS.INTERNAL_SERVER_ERROR).toEqual(statusCode.internalServerError);
    expect(HTTP_STATUS.NOT_IMPLEMENTED).toEqual(statusCode.notImplemented);
    expect(HTTP_STATUS.BAD_GATEWAY).toEqual(statusCode.badGateway);
    expect(HTTP_STATUS.SERVICE_UNAVAILABLE).toEqual(statusCode.serviceUnavailable);
  });
});
