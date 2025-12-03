import { OwnerName } from '../../../../src/modules/owners/domain/ownerName';
import { WordMother } from '../../shared/domain/wordMother';

export class OwnerNameMother {
  static create(value: string): OwnerName {
    return new OwnerName(value);
  }

  static random(): OwnerName {
    return this.create(WordMother.randomWithLength({ min: 3, max: 30 }));
  }

  static invalidName(): string {
    return 'a'.repeat(31);
  }
}
