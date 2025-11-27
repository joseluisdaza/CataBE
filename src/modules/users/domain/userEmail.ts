import { StringValueObject } from '../../shared/domain/value-object/stringValueObject';
import { UserEmailNotValid } from './userEmailNotValid';

export class UserEmail extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensureIsValidEmail(value);
  }

  private ensureIsValidEmail(value: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(value)) {
      throw new UserEmailNotValid(`The email <${value}> is not valid`);
    }
  }
}
