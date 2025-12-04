import { PropertyTaxZone } from '../../../../src/modules/properties/domain/propertyTaxZone';
import { MotherCreator } from '../../shared/domain/motherCreator';

export class PropertyTaxZoneMother {
  static create(value: string): PropertyTaxZone {
    return new PropertyTaxZone(value);
  }

  static random(): PropertyTaxZone {
    const n = MotherCreator.random().number.int({ min: 1, max: 20 });
    return this.create(`ZONE ${n}`);
  }
}
