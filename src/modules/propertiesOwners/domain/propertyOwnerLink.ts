import { AggregateRoot } from '../../shared/domain/aggregateRoot';
import { PropertyId } from '../../properties/domain/propertyId';
import { OwnerId } from '../../owners/domain/ownerId';

export class PropertyOwnerLink extends AggregateRoot {
  readonly propertyId: PropertyId;
  readonly ownerId: OwnerId;

  constructor(propertyId: PropertyId, ownerId: OwnerId) {
    super();
    this.propertyId = propertyId;
    this.ownerId = ownerId;
  }

  toPrimitives(): any {
    return {
      propertyId: this.propertyId.value,
      ownerId: this.ownerId.value,
    };
  }
}
