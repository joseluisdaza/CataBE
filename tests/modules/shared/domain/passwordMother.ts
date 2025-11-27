import { MotherCreator } from './motherCreator';

export class PasswordMother {
  static random(): string {
    return MotherCreator.random().internet.password();
  }

  static randomWithLength(length: number): string {
    return MotherCreator.random().internet.password({ length });
  }
}
