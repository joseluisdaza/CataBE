import { PropertyOwnerLinkRepository } from '../domain/propertyOwnerLinkRepository';
import { PropertyRepository } from '../../properties/domain/propertyRepository';
import { OwnerId } from '../../owners/domain/ownerId';
import { Property } from '../../properties/domain/property';

export default class OwnerPropertiesFinder {
  constructor(private readonly links: PropertyOwnerLinkRepository, private readonly properties: PropertyRepository) {}

  async run(ownerId: string): Promise<Property[]> {
    const ids = await this.links.findPropertyIdsByOwnerId(new OwnerId(ownerId));
    const result: Property[] = [];
    for (const id of ids) {
      const p = await this.properties.findById(id);
      if (p) result.push(p);
    }
    return result;
  }
}

