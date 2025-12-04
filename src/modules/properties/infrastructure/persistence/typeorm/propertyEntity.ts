import { EntitySchema } from 'typeorm';
import { Property } from '../../../domain/property';
import { ValueObjectTransformer } from '../../../../shared/infrastructure/persistence/typeorm/valueObjectTransformer';
import { PropertyId } from '../../../domain/propertyId';
import { PropertyUnitNumber } from '../../../domain/propertyUnitNumber';
import { PropertyCadastralCode } from '../../../domain/propertyCadastralCode';
import { PropertyMunicipality } from '../../../domain/propertyMunicipality';
import { PropertyClass } from '../../../domain/propertyClass';
import { PropertyArea } from '../../../domain/propertyArea';
import { PropertyTaxZone } from '../../../domain/propertyTaxZone';
import { PropertyType } from '../../../domain/propertyType';
import { PropertyLocation } from '../../../domain/propertyLocation';

export const PropertyEntity = new EntitySchema<Property>({
  name: 'Property',
  tableName: 'properties',
  target: Property,
  columns: {
    id: { type: String, primary: true, transformer: ValueObjectTransformer(PropertyId) },
    unitNumber: { type: String, name: 'numero_inmueble', transformer: ValueObjectTransformer(PropertyUnitNumber) },
    cadastralCode: { type: String, unique: true, name: 'codigo_catastral', transformer: ValueObjectTransformer(PropertyCadastralCode) },
    municipality: { type: String, name: 'gobierno_municipal', transformer: ValueObjectTransformer(PropertyMunicipality) },
    propertyClass: { type: String, transformer: ValueObjectTransformer(PropertyClass) },
    area: { type: String, transformer: ValueObjectTransformer(PropertyArea) },
    taxZone: { type: String, name: 'zona_tributaria', transformer: ValueObjectTransformer(PropertyTaxZone) },
    propertyType: { type: String, name: 'tipo_propiedad', transformer: ValueObjectTransformer(PropertyType) },
    location: { type: String, transformer: ValueObjectTransformer(PropertyLocation) },
    createdAt: { type: 'timestamp', createDate: true, name: 'created_at' },
    updatedAt: { type: 'timestamp', updateDate: true, name: 'updated_at' }
  }
});
