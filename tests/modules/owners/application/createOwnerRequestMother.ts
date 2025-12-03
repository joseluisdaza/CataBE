import { CreateOwnerRequest } from '../../../../src/modules/owners/application/createOwnerRequest';
import { OwnerIdMother } from '../domain/ownerIdMother';
import { OwnerNameMother } from '../domain/ownerNameMother';
import { OwnerCiNitMother } from '../domain/ownerCiNitMother';
import { OwnerPhoneMother } from '../domain/ownerPhoneMother';

export class CreateOwnerRequestMother {
  static random(): CreateOwnerRequest {
    return {
      id: OwnerIdMother.random().value,
      name: OwnerNameMother.random().value,
      ciNit: OwnerCiNitMother.random().value,
      phone: OwnerPhoneMother.random().value,
    };
  }

  static invalidName(): CreateOwnerRequest {
    return {
      id: OwnerIdMother.random().value,
      name: OwnerNameMother.invalidName(),
      ciNit: OwnerCiNitMother.random().value,
      phone: OwnerPhoneMother.random().value,
    };
  }

  static invalidCiNit(): CreateOwnerRequest {
    return {
      id: OwnerIdMother.random().value,
      name: OwnerNameMother.random().value,
      ciNit: OwnerCiNitMother.invalidCiNit(),
      phone: OwnerPhoneMother.random().value,
    };
  }

  static invalidPhone(): CreateOwnerRequest {
    return {
      id: OwnerIdMother.random().value,
      name: OwnerNameMother.random().value,
      ciNit: OwnerCiNitMother.random().value,
      phone: OwnerPhoneMother.invalidPhone(),
    };
  }
}
