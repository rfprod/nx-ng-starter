import { Message, User, UserLoginCredentials, UserLogoutCredentials, UserName } from '@app/backend-interfaces';
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

  public login(credentials: UserLoginCredentials): User {
    return this.authenticateAndReturnProfile(credentials);
  }

  public logout(credentials: UserLogoutCredentials): Message {
    return new Message({ message: `success for token ${credentials.token}` });
  }

  public signup(credentials: UserLoginCredentials): User {
    return this.authenticateAndReturnProfile(credentials);
  }

  private authenticateAndReturnProfile(credentials: UserLoginCredentials): User {
    const name = new UserName({
      first: '',
      last: '',
    });
    const profile = new User({
      id: '0',
      name,
      token: this.generateJWToken({
        email: credentials.email,
        name: `${name.first} ${name.last}`,
      }),
    });
    return profile;
  }
}
