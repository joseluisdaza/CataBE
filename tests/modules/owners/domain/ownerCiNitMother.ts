import { OwnerCiNit } from '../../../../src/modules/owners/domain/ownerCiNit';
import { MotherCreator } from '../../shared/domain/motherCreator';

export class OwnerCiNitMother {
  static create(value: string): OwnerCiNit {
    return new OwnerCiNit(value);
  }

  static random(): OwnerCiNit {
    const len = MotherCreator.random().number.int({ min: 5, max: 15 });
    const digits = MotherCreator.random().string.numeric({ length: len });
    return this.create(digits);
  }

  static invalidCiNit(): string {
    return 'ABC123';
  }
}
