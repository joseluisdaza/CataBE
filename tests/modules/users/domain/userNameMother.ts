import { UserName } from '../../../../src/modules/users/domain/userName';
import { WordMother } from '../../shared/domain/wordMother';

export class UserNameMother {
  static create(value: string): UserName {
    return new UserName(value);
  }

  static random(): UserName {
    return this.create(WordMother.randomWithLength({ min: 3, max: 30 }));
  }

  static invalidName(): string {
    return 'a'.repeat(31);
  }
}
