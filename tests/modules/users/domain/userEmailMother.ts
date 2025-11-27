import { UserEmail } from '../../../../src/modules/users/domain/userEmail';
import { EmailMother } from '../../shared/domain/emailMother';

export class UserEmailMother {
  static create(value: string): UserEmail {
    return new UserEmail(value);
  }

  static random(): UserEmail {
    return this.create(EmailMother.random());
  }

  static invalidEmail(): string {
    return 'invalid-email';
  }
}
