import { UserId } from '../../../../src/modules/users/domain/userId';
import { UuidMother } from '../../shared/domain/uuidMother';

export class UserIdMother {
  static create(value: string): UserId {
    return new UserId(value);
  }

  static random(): UserId {
    return this.create(UuidMother.random());
  }
}
