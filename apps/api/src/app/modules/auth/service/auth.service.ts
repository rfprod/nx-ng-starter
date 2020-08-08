import { Injectable } from '@nestjs/common';
import {
  Message,
  UserContacts,
  UserLoginCredentials,
  UserLogoutCredentials,
  UserName,
  UserProfile,
} from '@nx-ng-starter/api-interface';

import { ApiAuthUtilsService } from '../../auth-utils/service/auth-utils.service';

@Injectable()
export class ApiAuthService {
  constructor(private readonly authUtils: ApiAuthUtilsService) {}

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
    const token = this.authUtils.generateJWToken({
      email: contacts.email,
      name: `${name.first} ${name.last}`,
    });
    const profile: UserProfile = new UserProfile({ id, name, contacts, token });
    return profile;
  }
}
