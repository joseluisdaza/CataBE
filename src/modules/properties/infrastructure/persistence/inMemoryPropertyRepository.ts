import { Nullable } from '../../../shared/domain/nullable';
import { Property } from '../../domain/property';
import { PropertyId } from '../../domain/propertyId';
import { PropertyCadastralCode } from '../../domain/propertyCadastralCode';
import { PropertyRepository } from '../../domain/propertyRepository';

export default class InMemoryPropertyRepository implements PropertyRepository {
  private readonly properties: Map<string, Property> = new Map();

  async save(property: Property): Promise<void> {
    this.properties.set(property.id.value, property);
  }

  async findById(id: PropertyId): Promise<Nullable<Property>> {
    return this.properties.get(id.value) ?? null;
  }

  async findByCodigoCatastral(code: PropertyCadastralCode): Promise<Nullable<Property>> {
    for (const p of this.properties.values()) {
      if (p.cadastralCode.equal(code)) return p;
    }
    return null;
  }

  async findAll(): Promise<Property[]> {
    return Array.from(this.properties.values());
  }

  async delete(id: PropertyId): Promise<void> {
    this.properties.delete(id.value);
  }
}
