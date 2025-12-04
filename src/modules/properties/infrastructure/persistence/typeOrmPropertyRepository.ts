import { EntitySchema } from 'typeorm';
import { Nullable } from '../../../shared/domain/nullable';
import { TypeOrmRepository } from '../../../shared/infrastructure/persistence/typeorm/typeOrmRepository';
import { Property } from '../../domain/property';
import { PropertyId } from '../../domain/propertyId';
import { PropertyCadastralCode } from '../../domain/propertyCadastralCode';
import { PropertyRepository } from '../../domain/propertyRepository';
import { PropertyEntity } from './typeorm/propertyEntity';

export default class TypeOrmPropertyRepository extends TypeOrmRepository<Property> implements PropertyRepository {
  async save(property: Property): Promise<void> {
    return this.persist(property);
  }

  async findById(id: PropertyId): Promise<Nullable<Property>> {
    const repository = await this.repository();
    const p = await repository.findOne({ where: { id } });
    return p ?? null;
  }

  async findByCodigoCatastral(code: PropertyCadastralCode): Promise<Nullable<Property>> {
    const repository = await this.repository();
    const p = await repository.findOne({ where: { cadastralCode: code } });
    return p ?? null;
  }

  async findAll(): Promise<Property[]> {
    const repository = await this.repository();
    return repository.find();
  }

  async delete(id: PropertyId): Promise<void> {
    const repository = await this.repository();
    await repository.delete({ id });
  }

  protected entitySchema(): EntitySchema<Property> {
    return PropertyEntity;
  }
}
