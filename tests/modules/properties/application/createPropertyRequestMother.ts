import { CreatePropertyRequest } from '../../../../src/modules/properties/application/createPropertyRequest';
import { PropertyIdMother } from '../domain/propertyIdMother';
import { MotherCreator } from '../../shared/domain/motherCreator';
import { PropertyUnitNumberMother } from '../domain/propertyUnitNumberMother';
import { PropertyCadastralCodeMother } from '../domain/propertyCadastralCodeMother';
import { PropertyMunicipalityMother } from '../domain/propertyMunicipalityMother';
import { PropertyClassMother } from '../domain/propertyClassMother';
import { PropertyAreaMother } from '../domain/propertyAreaMother';
import { PropertyTaxZoneMother } from '../domain/propertyTaxZoneMother';
import { PropertyTypeMother } from '../domain/propertyTypeMother';
import { PropertyLocationMother } from '../domain/propertyLocationMother';

export class CreatePropertyRequestMother {
  static random(): CreatePropertyRequest {
    return {
      id: PropertyIdMother.random().value,
      unitNumber: PropertyUnitNumberMother.random().value,
      cadastralCode: PropertyCadastralCodeMother.random().value,
      municipality: PropertyMunicipalityMother.random().value,
      propertyClass: PropertyClassMother.random().value,
      area: PropertyAreaMother.random().value,
      taxZone: PropertyTaxZoneMother.random().value,
      propertyType: PropertyTypeMother.random().value,
      location: PropertyLocationMother.random().value,
    };
  }
}
