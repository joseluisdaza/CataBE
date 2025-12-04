import { PropertyOwnerLinkRepository } from '../domain/propertyOwnerLinkRepository';
import { OwnerRepository } from '../../owners/domain/ownerRepository';
import { PropertyId } from '../../properties/domain/propertyId';
import { Owner } from '../../owners/domain/owner';

export default class PropertyOwnersFinder {
  constructor(private readonly links: PropertyOwnerLinkRepository, private readonly owners: OwnerRepository) {}

  async run(propertyId: string): Promise<Owner[]> {
    const ids = await this.links.findOwnerIdsByPropertyId(new PropertyId(propertyId));
    const result: Owner[] = [];
    for (const id of ids) {
      const owner = await this.owners.findById(id);
      if (owner) result.push(owner);
    }
    return result;
  }
}

