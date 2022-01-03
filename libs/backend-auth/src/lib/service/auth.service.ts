import { Message, UserLoginCredentials, UserLogoutCredentials, UserName, UserProfile } from '@app/backend-interfaces';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export interface IAuthPayload {
  email: string;
  name: string;
}

@Injectable()
export class BackendAuthService {
  constructor(private readonly jwt: JwtService) {}

  public generateJWToken(payload: IAuthPayload) {
    const token = this.jwt.sign(payload);
    return token;
  }

  public decodeJWToken(token: string) {
    const result = <IAuthPayload & { iat: number }>this.jwt.decode(token);
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
    const name: UserName = {
      first: '',
      last: '',
    };
    const profile: UserProfile = new UserProfile({
      id: '0',
      name,
      contacts: {
        email: credentials.email,
        phone: '',
      },
      token: this.generateJWToken({
        email: credentials.email,
        name: `${name.first} ${name.last}`,
      }),
    });
    return profile;
  }
}
