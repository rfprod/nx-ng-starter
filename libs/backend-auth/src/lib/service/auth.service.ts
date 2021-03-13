import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  Message,
  UserContacts,
  UserLoginCredentials,
  UserLogoutCredentials,
  UserName,
  UserProfile,
} from '@nx-ng-starter/backend-interfaces';

export interface IAuthPayload {
  email: string;
  name: string;
  expires: Date;
}

@Injectable()
export class BackendAuthService {
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

  public ping(): Message {
    return new Message({
      message: 'Auth service is online. Public methods: login, logout, signup.',
    });
  }

  public login(credentials: UserLoginCredentials): UserProfile {
    return this.authenticateAndReturnProfile(credentials);
  }

  public logout(credentials: UserLogoutCredentials): Message {
    return new Message({ message: `success for token ${credentials.token}` });
  }

  public signup(credentials: UserLoginCredentials): UserProfile {
    return this.authenticateAndReturnProfile(credentials);
  }

  private authenticateAndReturnProfile(credentials: UserLoginCredentials): UserProfile {
    const id = '0';
    const name: UserName = {
      first: '',
      last: '',
    };
    const contacts: UserContacts = {
      email: credentials.email,
      phone: '',
    };
    const token = this.generateJWToken({
      email: contacts.email,
      name: `${name.first} ${name.last}`,
    });
    const profile: UserProfile = new UserProfile({ id, name, contacts, token });
    return profile;
  }
}
