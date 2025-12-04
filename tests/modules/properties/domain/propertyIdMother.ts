import { PropertyId } from '../../../../src/modules/properties/domain/propertyId';
import { UuidMother } from '../../shared/domain/uuidMother';

export class PropertyIdMother {
  static create(value: string): PropertyId {
    return new PropertyId(value);
  }

  static random(): PropertyId {
    return this.create(UuidMother.random());
  }
}
