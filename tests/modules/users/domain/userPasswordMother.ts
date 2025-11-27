import { UserPassword } from '../../../../src/modules/users/domain/userPassword';
import { PasswordMother } from '../../shared/domain/passwordMother';

export class UserPasswordMother {
  static create(value: string): UserPassword {
    return new UserPassword(value);
  }

  static random(): UserPassword {
    return this.create(PasswordMother.randomWithLength(8));
  }

  static invalidPassword(): string {
    return PasswordMother.randomWithLength(5);
  }
}
