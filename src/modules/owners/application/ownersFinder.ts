import { OwnerRepository } from '../domain/ownerRepository';
import { Owner } from '../domain/owner';

export default class OwnersFinder {
  private readonly repository: OwnerRepository;

  constructor(repository: OwnerRepository) {
    this.repository = repository;
  }

  async run(): Promise<Owner[]> {
    const owners = await this.repository.findAll();
    return owners;
  }
}
