import { MotherCreator } from './motherCreator';

export class EmailMother {
  static random(): string {
    return MotherCreator.random().internet.email();
  }
}
