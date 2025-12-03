import { EntitySchema } from 'typeorm';
import { Nullable } from '../../../shared/domain/nullable';
import { TypeOrmRepository } from '../../../shared/infrastructure/persistence/typeorm/typeOrmRepository';
import { Owner } from '../../domain/owner';
import { OwnerId } from '../../domain/ownerId';
import { OwnerCiNit } from '../../domain/ownerCiNit';
import { OwnerRepository } from '../../domain/ownerRepository';
import { OwnerEntity } from './typeorm/ownerEntity';

export default class TypeOrmOwnerRepository extends TypeOrmRepository<Owner> implements OwnerRepository {
  public async save(owner: Owner): Promise<void> {
    return this.persist(owner);
  }

  public async findById(id: OwnerId): Promise<Nullable<Owner>> {
    const repository = await this.repository();
    const owner = await repository.findOne({ where: { id } });
    return owner;
  }

  public async findByCiNit(ciNit: OwnerCiNit): Promise<Nullable<Owner>> {
    const repository = await this.repository();
    const owner = await repository.findOne({ where: { ciNit } });
    return owner;
  }

  public async findAll(): Promise<Owner[]> {
    const repository = await this.repository();
    const owners = await repository.find();
    return owners;
  }

  public async delete(id: OwnerId): Promise<void> {
    const repository = await this.repository();
    await repository.delete({ id });
  }

  protected entitySchema(): EntitySchema<Owner> {
    return OwnerEntity;
  }
}
