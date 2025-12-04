import { Property } from '../domain/property';
import { PropertyId } from '../domain/propertyId';
import { PropertyUnitNumber } from '../domain/propertyUnitNumber';
import { PropertyCadastralCode } from '../domain/propertyCadastralCode';
import { PropertyMunicipality } from '../domain/propertyMunicipality';
import { PropertyClass } from '../domain/propertyClass';
import { PropertyArea } from '../domain/propertyArea';
import { PropertyTaxZone } from '../domain/propertyTaxZone';
import { PropertyType } from '../domain/propertyType';
import { PropertyLocation } from '../domain/propertyLocation';
import { PropertyRepository } from '../domain/propertyRepository';
import { CreatePropertyRequest } from './createPropertyRequest';

export default class PropertyUpdater {
  constructor(private readonly repository: PropertyRepository) {}

  async run(req: CreatePropertyRequest): Promise<void> {
    const id = new PropertyId(req.id);
    const code = new PropertyCadastralCode(req.cadastralCode);
    const existingByCode = await this.repository.findByCodigoCatastral(code);
    if (existingByCode && existingByCode.id.value !== id.value) {
      throw new Error(`Property with code ${req.cadastralCode} already exists`);
    }

    const property = new Property(
      id,
      new PropertyUnitNumber(req.unitNumber),
      code,
      new PropertyMunicipality(req.municipality),
      new PropertyClass(req.propertyClass),
      new PropertyArea(req.area),
      new PropertyTaxZone(req.taxZone),
      new PropertyType(req.propertyType),
      new PropertyLocation(req.location)
    );

    await this.repository.save(property);
  }
}
