import { PropertyUnitNumber } from '../../../../src/modules/properties/domain/propertyUnitNumber';
import { MotherCreator } from '../../shared/domain/motherCreator';

export class PropertyUnitNumberMother {
  static create(value: string): PropertyUnitNumber {
    return new PropertyUnitNumber(value);
  }

  static random(): PropertyUnitNumber {
    const value = MotherCreator.random().string.numeric({ length: 5 });
    return this.create(value);
  }
}
