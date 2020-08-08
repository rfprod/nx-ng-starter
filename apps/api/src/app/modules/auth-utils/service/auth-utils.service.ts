import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export interface IAuthPayload {
  email: string;
  name: string;
  expires: Date;
}

@Injectable()
export class ApiAuthUtilsService {
  constructor(private readonly jwt: JwtService) {}

  /**
   * Generates JWT token
   */
  public generateJWToken(payload: Omit<IAuthPayload, 'expires'>) {
    const expires = new Date();
    const daysInWeek = 7;
    expires.setDate(expires.getDate() + daysInWeek);
    const token = this.jwt.sign(payload);
    return token;
  }

  /**
   * Decrypts JWT token.
   * @param token user token
   */
  public decryptJWToken(token: string) {
    const result = this.jwt.decode(token) as IAuthPayload;
    return result;
  }
}
