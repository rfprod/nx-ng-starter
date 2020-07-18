import { Injectable } from '@nestjs/common';
import { UserToken } from '@nx-ng-starter/api-interface';
import crypto from 'crypto';
import jwt from 'jwt-simple';

export interface IAuthPayload {
  email: string;
  name: string;
  expires: Date;
}

@Injectable()
export class ApiAuthUtilsService {
  /**
   * Generates JWT token
   * @param payload token payload
   */
  public generateJWToken(payload: IAuthPayload): UserToken {
    const bytes = 24;
    const salt = crypto.randomBytes(bytes).toString('hex');
    const token = jwt.encode(payload, salt, 'HS256'); // HS256, HS384, HS512, RS256.
    const tokenObject: UserToken = new UserToken({ token, salt });
    return tokenObject;
  }

  /**
   * Decrypts JWT token.
   * @param token user token
   * @param storedSalt stored salt
   */
  public decryptJWToken(token: string, storedSalt = ''): string {
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
    const payload: IAuthPayload = { email, name, expires };
    const tokenObject: UserToken = this.generateJWToken(payload);
    return tokenObject;
  }
}
