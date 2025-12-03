import { Owner } from './owner';
import { OwnerId } from './ownerId';
import { OwnerCiNit } from './ownerCiNit';
import { Nullable } from '../../shared/domain/nullable';

export interface OwnerRepository {
  save(owner: Owner): Promise<void>;
  findById(id: OwnerId): Promise<Nullable<Owner>>;
  findByCiNit(ciNit: OwnerCiNit): Promise<Nullable<Owner>>;
  findAll(): Promise<Owner[]>;
}
