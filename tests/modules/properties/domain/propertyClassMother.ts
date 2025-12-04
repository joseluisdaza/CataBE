import { PropertyClass } from '../../../../src/modules/properties/domain/propertyClass';
import { WordMother } from '../../shared/domain/wordMother';

export class PropertyClassMother {
  static create(value: string): PropertyClass {
    return new PropertyClass(value);
  }

  static random(): PropertyClass {
    return this.create(WordMother.random());
  }
}
