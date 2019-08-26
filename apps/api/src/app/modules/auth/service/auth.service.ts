import { Injectable } from '@nestjs/common';

import {
  Message,
  UserProfile
} from '@nx-ng-starter/api-interface';

@Injectable()
export class AuthService {

  public getData(): Message {
    return new Message({ message: 'Welcome to api!' });
  }

  public login(): UserProfile {
    return new UserProfile();
  }

  public logout(): Message {
    return new Message({ message: 'success'});
  }

}
