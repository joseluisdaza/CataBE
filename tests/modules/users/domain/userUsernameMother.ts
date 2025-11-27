import { UserUsername } from '../../../../src/modules/users/domain/userUsername';
import { WordMother } from '../../shared/domain/wordMother';

export class UserUsernameMother {
  static create(value: string): UserUsername {
    return new UserUsername(value);
  }

  static random(): UserUsername {
    return this.create(WordMother.random());
  }

  static invalidUsername(): string {
    return 'a'.repeat(31); // Exceeds 30 characters
  }
}
