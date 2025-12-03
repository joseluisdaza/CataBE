import { OwnerRepository } from '../domain/ownerRepository';
import { OwnerId } from '../domain/ownerId';
import { Owner } from '../domain/owner';

export default class OwnerFinder {
  private readonly repository: OwnerRepository;

  constructor(repository: OwnerRepository) {
    this.repository = repository;
  }

  async run(id: string): Promise<Owner | null> {
    const owner = await this.repository.findById(new OwnerId(id));
    return owner ?? null;
  }
}
