import { StringValueObject } from '../../shared/domain/value-object/stringValueObject';
import { OwnerPhoneNotValid } from './ownerPhoneNotValid';

export class OwnerPhone extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensureIsValid(value);
  }

  private ensureIsValid(value: string): void {
    const regex = /^\d{7,10}$/;
    if (!regex.test(value)) {
      throw new OwnerPhoneNotValid(`The phone <${value}> is not valid`);
    }
  }
}
