import { PropertyId } from '../../properties/domain/propertyId';
import { OwnerId } from '../../owners/domain/ownerId';

export interface PropertyOwnerLinkRepository {
  add(propertyId: PropertyId, ownerId: OwnerId): Promise<void>;
  remove(propertyId: PropertyId, ownerId: OwnerId): Promise<void>;
  findOwnerIdsByPropertyId(propertyId: PropertyId): Promise<OwnerId[]>;
  findPropertyIdsByOwnerId(ownerId: OwnerId): Promise<PropertyId[]>;
}

