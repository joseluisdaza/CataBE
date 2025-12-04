import { Nullable } from '../../shared/domain/nullable';
import { Property } from './property';
import { PropertyId } from './propertyId';
import { PropertyCadastralCode } from './propertyCadastralCode';

export interface PropertyRepository {
  save(property: Property): Promise<void>;
  findById(id: PropertyId): Promise<Nullable<Property>>;
  findByCodigoCatastral(code: PropertyCadastralCode): Promise<Nullable<Property>>;
  findAll(): Promise<Property[]>;
  delete(id: PropertyId): Promise<void>;
}
