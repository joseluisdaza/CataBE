import { PropertyRepository } from '../domain/propertyRepository';
import { PropertyId } from '../domain/propertyId';

export default class PropertyDeleter {
  constructor(private readonly repository: PropertyRepository) {}

  async run(id: string): Promise<void> {
    const pid = new PropertyId(id);
    const existing = await this.repository.findById(pid);
    if (!existing) return;
    await this.repository.delete(pid);
  }
}
