import { OwnerId } from '../../../../src/modules/owners/domain/ownerId';
import { UuidMother } from '../../shared/domain/uuidMother';

export class OwnerIdMother {
  static create(value: string): OwnerId {
    return new OwnerId(value);
  }

  static random(): OwnerId {
    return this.create(UuidMother.random());
  }
}
