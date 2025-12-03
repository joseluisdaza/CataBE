import { Owner } from '../domain/owner';
import { OwnerId } from '../domain/ownerId';
import { OwnerName } from '../domain/ownerName';
import { OwnerCiNit } from '../domain/ownerCiNit';
import { OwnerPhone } from '../domain/ownerPhone';
import { OwnerRepository } from '../domain/ownerRepository';
import { CreateOwnerRequest } from './createOwnerRequest';

export default class OwnerUpdater {
  private readonly repository: OwnerRepository;

  constructor(repository: OwnerRepository) {
    this.repository = repository;
  }

  async run(request: CreateOwnerRequest): Promise<void> {
    const id = new OwnerId(request.id);
    const ciNitVo = new OwnerCiNit(request.ciNit);

    const existingByCiNit = await this.repository.findByCiNit(ciNitVo);
    if (existingByCiNit && existingByCiNit.id.value !== id.value) {
      throw new Error(`Owner with CI/NIT ${request.ciNit} already exists`);
    }

    const owner = new Owner(
      id,
      new OwnerName(request.name),
      ciNitVo,
      new OwnerPhone(request.phone)
    );

    await this.repository.save(owner);
  }
}
