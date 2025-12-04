import { PropertyCadastralCode } from '../../../../src/modules/properties/domain/propertyCadastralCode';
import { MotherCreator } from '../../shared/domain/motherCreator';

export class PropertyCadastralCodeMother {
  static create(value: string): PropertyCadastralCode {
    return new PropertyCadastralCode(value);
  }

  static random(): PropertyCadastralCode {
    const rnd = MotherCreator.random();
    const suffix = rnd.string.numeric({ length: 3 });
    const code = `16-425-018-0-00-000-${suffix}`;
    return this.create(code);
  }
}
