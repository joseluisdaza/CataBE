import { StringValueObject } from '../../shared/domain/value-object/stringValueObject';
import { OwnerCiNitNotValid } from './ownerCiNitNotValid';

export class OwnerCiNit extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensureIsValid(value);
  }

  private ensureIsValid(value: string): void {
    const regex = /^\d{5,15}$/;
    if (!regex.test(value)) {
      throw new OwnerCiNitNotValid(`The CI/NIT <${value}> is not valid`);
    }
  }
}
