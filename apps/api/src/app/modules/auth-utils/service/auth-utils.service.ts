import { Injectable } from '@nestjs/common';
import { UserToken } from '@nx-ng-starter/api-interface';

import crypto from 'crypto';
import jwt from 'jwt-simple';

@Injectable()
export class AuthUtilsService {
  /**
   * Generates JWT token
   * @param payload token payload
   */
  public generateJWToken(payload): UserToken {
    const salt = crypto.randomBytes(24).toString('hex');
    const token = jwt.encode(payload, salt, 'HS256'); // HS256, HS384, HS512, RS256.
    const tokenObject: UserToken = new UserToken({ token, salt });
    return tokenObject;
  }

  /**
   * Decrypts JWT token.
   * @param token user token
   * @param storedSalt stored salt
   */
  public decryptJWToken(token: string, storedSalt: string = ''): string {
    const result: string = !token ? '' : jwt.decode(token, storedSalt, false, 'HS256'); // HS256, HS384, HS512, RS256.
    return result;
  }

  /**
   * Returns token object with payload
   * @param email user email
   * @param name user name
   */
  public getTokenWithPayload(email: string, name: string): UserToken {
    const expires = new Date();
    const daysInWeek = 7;
    expires.setDate(expires.getDate() + daysInWeek);
    const payload = { email, name, expires };
    const tokenObject: UserToken = this.generateJWToken(payload);
    return tokenObject;
  }
}
