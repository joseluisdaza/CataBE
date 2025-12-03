import { Owner } from '../domain/owner';
import { OwnerId } from '../domain/ownerId';
import { OwnerName } from '../domain/ownerName';
import { OwnerCiNit } from '../domain/ownerCiNit';
import { OwnerPhone } from '../domain/ownerPhone';
import { OwnerRepository } from '../domain/ownerRepository';
import { CreateOwnerRequest } from './createOwnerRequest';

export default class OwnerRegistrar {
  private readonly repository: OwnerRepository;

  constructor(repository: OwnerRepository) {
    this.repository = repository;
  }

  async run(request: CreateOwnerRequest): Promise<void> {
    const existingByCiNit = await this.repository.findByCiNit(new OwnerCiNit(request.ciNit));
    if (existingByCiNit) {
      throw new Error(`Owner with CI/NIT ${request.ciNit} already exists`);
    }

    const owner = new Owner(
      new OwnerId(request.id),
      new OwnerName(request.name),
      new OwnerCiNit(request.ciNit),
      new OwnerPhone(request.phone)
    );

    await this.repository.save(owner);
  }
}
