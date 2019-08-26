/**
 * User name interface with initialization.
 */
export class UserName {
  constructor(input?: UserName) {
    if (input) {
      this.first = input.first;
      this.last = input.last;
    }
  }
  first: string = '';
  last: string = '';
}

/**
 * User contacts interface with initialization.
 */
export class UserContacts {
  constructor(input?: UserContacts) {
    if (input) {
      this.email = input.email;
      this.phone = input.phone;
    }
  }
  email: string = '';
  phone: string = '';
}

/**
 * User profile interface with initialization.
 */
export class UserProfile {
  constructor(input?: UserProfile) {
    if (input) {
      this.id = input.id;
      this.name = input.name;
      this.contacts = input.contacts;
    }
  }
  id: string = '';
  name: UserName = new UserName();
  contacts: UserContacts = new UserContacts();
}
