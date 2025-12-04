import { PropertyOwnerLinkRepository } from '../domain/propertyOwnerLinkRepository';
import { PropertyId } from '../../properties/domain/propertyId';
import { OwnerId } from '../../owners/domain/ownerId';

export default class PropertyOwnersAdder {
  constructor(private readonly repository: PropertyOwnerLinkRepository) {}

  async run(propertyId: string, ownerId: string): Promise<void> {
    await this.repository.add(new PropertyId(propertyId), new OwnerId(ownerId));
  }
}

