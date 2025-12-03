import { OwnerPhone } from '../../../../src/modules/owners/domain/ownerPhone';
import { MotherCreator } from '../../shared/domain/motherCreator';

export class OwnerPhoneMother {
  static create(value: string): OwnerPhone {
    return new OwnerPhone(value);
  }

  static random(): OwnerPhone {
    const len = MotherCreator.random().number.int({ min: 7, max: 10 });
    const digits = MotherCreator.random().string.numeric({ length: len });
    return this.create(digits);
  }

  static invalidPhone(): string {
    return '12';
  }
}
