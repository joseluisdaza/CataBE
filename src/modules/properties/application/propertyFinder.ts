import { PropertyRepository } from '../domain/propertyRepository';
import { PropertyId } from '../domain/propertyId';
import { Property } from '../domain/property';

export default class PropertyFinder {
  constructor(private readonly repository: PropertyRepository) {}

  async run(id: string): Promise<Property | null> {
    const found = await this.repository.findById(new PropertyId(id));
    return found ?? null;
  }
}
