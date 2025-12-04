import { Property } from '../../../../src/modules/properties/domain/property';
import { PropertyId } from '../../../../src/modules/properties/domain/propertyId';
import { PropertyUnitNumberMother } from './propertyUnitNumberMother';
import { PropertyCadastralCodeMother } from './propertyCadastralCodeMother';
import { PropertyMunicipalityMother } from './propertyMunicipalityMother';
import { PropertyClassMother } from './propertyClassMother';
import { PropertyAreaMother } from './propertyAreaMother';
import { PropertyTaxZoneMother } from './propertyTaxZoneMother';
import { PropertyTypeMother } from './propertyTypeMother';
import { PropertyLocationMother } from './propertyLocationMother';
import { PropertyIdMother } from './propertyIdMother';
import { MotherCreator } from '../../shared/domain/motherCreator';
import { CreatePropertyRequest } from '../../../../src/modules/properties/application/createPropertyRequest';

export class PropertyMother {
  static random(): Property {
    const id = PropertyIdMother.random();
    const unitNumber = PropertyUnitNumberMother.random();
    const cadastralCode = PropertyCadastralCodeMother.random();
    const municipality = PropertyMunicipalityMother.random();
    const propertyClass = PropertyClassMother.random();
    const area = PropertyAreaMother.random();
    const taxZone = PropertyTaxZoneMother.random();
    const propertyType = PropertyTypeMother.random();
    const location = PropertyLocationMother.random();

    return new Property(id, unitNumber, cadastralCode, municipality, propertyClass, area, taxZone, propertyType, location);
  }

  static fromRequest(req: CreatePropertyRequest): Property {
    return new Property(
      new PropertyId(req.id),
      PropertyUnitNumberMother.create(req.unitNumber),
      PropertyCadastralCodeMother.create(req.cadastralCode),
      PropertyMunicipalityMother.create(req.municipality),
      PropertyClassMother.create(req.propertyClass),
      PropertyAreaMother.create(req.area),
      PropertyTaxZoneMother.create(req.taxZone),
      PropertyTypeMother.create(req.propertyType),
      PropertyLocationMother.create(req.location)
    );
  }
}
