import { PropertyRepository } from '../domain/propertyRepository';
import { Property } from '../domain/property';

export default class PropertiesFinder {
  constructor(private readonly repository: PropertyRepository) {}

  async run(): Promise<Property[]> {
    return this.repository.findAll();
  }
}
