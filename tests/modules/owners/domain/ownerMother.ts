import { Owner } from '../../../../src/modules/owners/domain/owner';
import { OwnerId } from '../../../../src/modules/owners/domain/ownerId';
import { OwnerName } from '../../../../src/modules/owners/domain/ownerName';
import { OwnerCiNit } from '../../../../src/modules/owners/domain/ownerCiNit';
import { OwnerPhone } from '../../../../src/modules/owners/domain/ownerPhone';
import { OwnerIdMother } from './ownerIdMother';
import { OwnerNameMother } from './ownerNameMother';
import { OwnerCiNitMother } from './ownerCiNitMother';
import { OwnerPhoneMother } from './ownerPhoneMother';
import { CreateOwnerRequest } from '../../../../src/modules/owners/application/createOwnerRequest';

export class OwnerMother {
  static create(
    id: OwnerId,
    name: OwnerName,
    ciNit: OwnerCiNit,
    phone: OwnerPhone
  ): Owner {
    return new Owner(id, name, ciNit, phone);
  }

  static fromRequest(request: CreateOwnerRequest): Owner {
    return this.create(
      OwnerIdMother.create(request.id),
      OwnerNameMother.create(request.name),
      OwnerCiNitMother.create(request.ciNit),
      OwnerPhoneMother.create(request.phone)
    );
  }

  static random(): Owner {
    return this.create(
      OwnerIdMother.random(),
      OwnerNameMother.random(),
      OwnerCiNitMother.random(),
      OwnerPhoneMother.random()
    );
  }
}
