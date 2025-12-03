import { EntitySchema } from 'typeorm';
import { Owner } from '../../../domain/owner';
import { ValueObjectTransformer } from '../../../../shared/infrastructure/persistence/typeorm/valueObjectTransformer';
import { OwnerId } from '../../../domain/ownerId';
import { OwnerName } from '../../../domain/ownerName';
import { OwnerCiNit } from '../../../domain/ownerCiNit';
import { OwnerPhone } from '../../../domain/ownerPhone';

export const OwnerEntity = new EntitySchema<Owner>({
  name: 'Owner',
  tableName: 'owners',
  target: Owner,
  columns: {
    id: { type: String, primary: true, transformer: ValueObjectTransformer(OwnerId) },
    name: { type: String, transformer: ValueObjectTransformer(OwnerName) },
    ciNit: { type: String, unique: true, name: 'ci_nit', transformer: ValueObjectTransformer(OwnerCiNit) },
    phone: { type: String, transformer: ValueObjectTransformer(OwnerPhone) },
    createdAt: { type: 'timestamp', createDate: true, name: 'created_at' },
    updatedAt: { type: 'timestamp', updateDate: true, name: 'updated_at' }
  }
});
