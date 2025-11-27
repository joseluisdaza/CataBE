import { StringValueObject } from '../../shared/domain/value-object/stringValueObject';
import { UserUsernameLengthExceeded } from './userUsernameLengthExceeded';

export class UserUsername extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensureLengthIsLessThan30Characters(value);
  }

  private ensureLengthIsLessThan30Characters(value: string): void {
    if (value.length > 30) {
      throw new UserUsernameLengthExceeded(
        `The User Username <${value}> has more than 30 characters`,
      );
    }
  }
}
