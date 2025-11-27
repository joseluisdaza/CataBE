import { StringValueObject } from '../../shared/domain/value-object/stringValueObject';
import { UserPasswordTooShort } from './userPasswordTooShort';

export class UserPassword extends StringValueObject {
  private static readonly MIN_LENGTH = 6;

  constructor(value: string) {
    super(value);
    this.ensureIsValidPassword(value);
  }

  private ensureIsValidPassword(value: string): void {
    if (value.length < UserPassword.MIN_LENGTH) {
      throw new UserPasswordTooShort(
        `Password must be at least ${UserPassword.MIN_LENGTH} characters long`
      );
    }
  }

  static fromHash(hashedValue: string): UserPassword {
    const password = Object.create(UserPassword.prototype);
    password.value = hashedValue;
    return password;
  }
}
