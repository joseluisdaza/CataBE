import { EntitySchema } from 'typeorm';
import { TypeOrmRepository } from '../../../shared/infrastructure/persistence/typeorm/typeOrmRepository';
import { PropertyOwnerLink } from '../../../propertiesOwners/domain/propertyOwnerLink';
import { PropertyOwnerLinkRepository } from '../../../propertiesOwners/domain/propertyOwnerLinkRepository';
import { PropertyId } from '../../../properties/domain/propertyId';
import { OwnerId } from '../../../owners/domain/ownerId';
import { PropertyOwnerLinkEntity } from './typeorm/propertyOwnerLinkEntity';

export default class TypeOrmPropertyOwnerLinkRepository extends TypeOrmRepository<PropertyOwnerLink> implements PropertyOwnerLinkRepository {
  async add(propertyId: PropertyId, ownerId: OwnerId): Promise<void> {
    const repository = await this.repository();
    await repository.save(new PropertyOwnerLink(propertyId, ownerId));
  }

  async remove(propertyId: PropertyId, ownerId: OwnerId): Promise<void> {
    const repository = await this.repository();
    await repository.delete({ propertyId, ownerId });
  }

  async findOwnerIdsByPropertyId(propertyId: PropertyId): Promise<OwnerId[]> {
    const repository = await this.repository();
    const rows = await repository.find({ where: { propertyId } });
    return rows.map(r => r.ownerId);
  }

  async findPropertyIdsByOwnerId(ownerId: OwnerId): Promise<PropertyId[]> {
    const repository = await this.repository();
    const rows = await repository.find({ where: { ownerId } });
    return rows.map(r => r.propertyId);
  }

  protected entitySchema(): EntitySchema<PropertyOwnerLink> {
    return PropertyOwnerLinkEntity;
  }
}

