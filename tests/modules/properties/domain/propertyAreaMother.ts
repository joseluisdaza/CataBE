import { PropertyArea } from '../../../../src/modules/properties/domain/propertyArea';
import { WordMother } from '../../shared/domain/wordMother';

export class PropertyAreaMother {
  static create(value: string): PropertyArea {
    return new PropertyArea(value);
  }

  static random(): PropertyArea {
    return this.create(WordMother.random());
  }
}
