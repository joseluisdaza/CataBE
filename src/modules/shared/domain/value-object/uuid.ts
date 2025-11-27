import {
  v4 as uuid,
  version as uuidVersion,
  validate as uuidValidate
 } from 'uuid';

import { InvalidArgumentError } from './invalidArgumentError';
import { ValueObject } from './valueObject';

export class Uuid extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.ensureIsValidUuid(value);
  }

  static random(): Uuid {
    return new Uuid(uuid());
  }

  private ensureIsValidUuid(id: string): void {
    if (!this.isValidUuidV4(id)) {
      throw new InvalidArgumentError(`<${this.constructor.name}> does not allow the value <${id}>`);
    }
  }

  private isValidUuidV4(id: string): boolean {
    return uuidValidate(id) && uuidVersion(id) === 4;
  }
}
