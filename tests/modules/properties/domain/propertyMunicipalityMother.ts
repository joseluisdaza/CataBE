import { PropertyMunicipality } from '../../../../src/modules/properties/domain/propertyMunicipality';
import { WordMother } from '../../shared/domain/wordMother';

export class PropertyMunicipalityMother {
  static create(value: string): PropertyMunicipality {
    return new PropertyMunicipality(value);
  }

  static random(): PropertyMunicipality {
    return this.create(WordMother.random());
  }
}
