import { MotherCreator } from './motherCreator';

export class WordMother {
  static random(): string {
    return MotherCreator.random().lorem.word();
  }

  static randomWithLength(length: { min: number, max: number }): string {
    return MotherCreator.random().lorem.word({ length });
  }
}
