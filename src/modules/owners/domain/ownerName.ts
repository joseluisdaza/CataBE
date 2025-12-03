import { StringValueObject } from '../../shared/domain/value-object/stringValueObject';
import { OwnerNameLengthExceeded } from './ownerNameLengthExceeded';

export class OwnerName extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensureLengthIsLessThan30Characters(value);
  }

  private ensureLengthIsLessThan30Characters(value: string): void {
    if (value.length > 30) {
      throw new OwnerNameLengthExceeded(`The Owner Name <${value}> has more than 30 characters`);
    }
  }
}
