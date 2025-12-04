import { PropertyType } from '../../../../src/modules/properties/domain/propertyType';
import { WordMother } from '../../shared/domain/wordMother';

export class PropertyTypeMother {
  static create(value: string): PropertyType {
    return new PropertyType(value);
  }

  static random(): PropertyType {
    return this.create(WordMother.random());
  }
}
