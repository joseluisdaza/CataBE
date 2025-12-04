import { EntitySchema } from 'typeorm';
import { PropertyOwnerLink } from '../../../domain/propertyOwnerLink';
import { ValueObjectTransformer } from '../../../../shared/infrastructure/persistence/typeorm/valueObjectTransformer';
import { PropertyId } from '../../../../properties/domain/propertyId';
import { OwnerId } from '../../../../owners/domain/ownerId';

export const PropertyOwnerLinkEntity = new EntitySchema<PropertyOwnerLink>({
  name: 'PropertyOwnerLink',
  tableName: 'lk_properties_owners',
  target: PropertyOwnerLink,
  columns: {
    propertyId: { type: String, primary: true, name: 'property_id', transformer: ValueObjectTransformer(PropertyId) },
    ownerId: { type: String, primary: true, name: 'owner_id', transformer: ValueObjectTransformer(OwnerId) },
  }
});

