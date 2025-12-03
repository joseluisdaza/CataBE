import { Nullable } from '../../../shared/domain/nullable';
import { Owner } from '../../domain/owner';
import { OwnerId } from '../../domain/ownerId';
import { OwnerCiNit } from '../../domain/ownerCiNit';
import { OwnerRepository } from '../../domain/ownerRepository';

export default class InMemoryOwnerRepository implements OwnerRepository {
  private readonly owners: Map<string, Owner> = new Map();

  async save(owner: Owner): Promise<void> {
    this.owners.set(owner.id.value, owner);
  }

  async findById(id: OwnerId): Promise<Nullable<Owner>> {
    return this.owners.get(id.value) ?? null;
  }

  async findByCiNit(ciNit: OwnerCiNit): Promise<Nullable<Owner>> {
    for (const owner of this.owners.values()) {
      if (owner.ciNit.equal(ciNit)) return owner;
    }
    return null;
  }

  async findAll(): Promise<Owner[]> {
    return Array.from(this.owners.values());
  }
}
