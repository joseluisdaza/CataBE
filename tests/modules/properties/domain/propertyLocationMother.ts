import { PropertyLocation } from '../../../../src/modules/properties/domain/propertyLocation';
import { WordMother } from '../../shared/domain/wordMother';

export class PropertyLocationMother {
  static create(value: string): PropertyLocation {
    return new PropertyLocation(value);
  }

  static random(): PropertyLocation {
    return this.create(WordMother.random());
  }
}
