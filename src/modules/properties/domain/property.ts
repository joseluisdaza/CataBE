import { AggregateRoot } from '../../shared/domain/aggregateRoot';
import { PropertyId } from './propertyId';
import { PropertyUnitNumber } from './propertyUnitNumber';
import { PropertyCadastralCode } from './propertyCadastralCode';
import { PropertyMunicipality } from './propertyMunicipality';
import { PropertyClass } from './propertyClass';
import { PropertyArea } from './propertyArea';
import { PropertyTaxZone } from './propertyTaxZone';
import { PropertyType } from './propertyType';
import { PropertyLocation } from './propertyLocation';

export class Property extends AggregateRoot {
  readonly id: PropertyId;
  readonly unitNumber: PropertyUnitNumber;
  readonly cadastralCode: PropertyCadastralCode;
  readonly municipality: PropertyMunicipality;
  readonly propertyClass: PropertyClass;
  readonly area: PropertyArea;
  readonly taxZone: PropertyTaxZone;
  readonly propertyType: PropertyType;
  readonly location: PropertyLocation;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;

  constructor(
    id: PropertyId,
    unitNumber: PropertyUnitNumber,
    cadastralCode: PropertyCadastralCode,
    municipality: PropertyMunicipality,
    propertyClass: PropertyClass,
    area: PropertyArea,
    taxZone: PropertyTaxZone,
    propertyType: PropertyType,
    location: PropertyLocation,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super();
    this.id = id;
    this.unitNumber = unitNumber;
    this.cadastralCode = cadastralCode;
    this.municipality = municipality;
    this.propertyClass = propertyClass;
    this.area = area;
    this.taxZone = taxZone;
    this.propertyType = propertyType;
    this.location = location;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromPrimitives(plain: {
    id: string;
    unitNumber: string;
    cadastralCode: string;
    municipality: string;
    propertyClass: string;
    area: string;
    taxZone: string;
    propertyType: string;
    location: string;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    return new Property(
      new PropertyId(plain.id),
      new PropertyUnitNumber(plain.unitNumber),
      new PropertyCadastralCode(plain.cadastralCode),
      new PropertyMunicipality(plain.municipality),
      new PropertyClass(plain.propertyClass),
      new PropertyArea(plain.area),
      new PropertyTaxZone(plain.taxZone),
      new PropertyType(plain.propertyType),
      new PropertyLocation(plain.location),
      plain.createdAt,
      plain.updatedAt
    );
  }

  toPrimitives() {
    return {
      id: this.id.value,
      unitNumber: this.unitNumber.value,
      cadastralCode: this.cadastralCode.value,
      municipality: this.municipality.value,
      propertyClass: this.propertyClass.value,
      area: this.area.value,
      taxZone: this.taxZone.value,
      propertyType: this.propertyType.value,
      location: this.location.value,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
