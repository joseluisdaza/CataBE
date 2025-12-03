import { OwnerRepository } from '../domain/ownerRepository';
import { OwnerId } from '../domain/ownerId';

export default class OwnerDeleter {
  private readonly repository: OwnerRepository;

  constructor(repository: OwnerRepository) {
    this.repository = repository;
  }

  async run(id: string): Promise<void> {
    const ownerId = new OwnerId(id);
    const existing = await this.repository.findById(ownerId);
    if (!existing) return;
    await this.repository.delete(ownerId);
  }
}
