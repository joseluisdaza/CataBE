import { EntitySchema } from 'typeorm';
import { User } from '../../../domain/user';
import { ValueObjectTransformer } from '../../../../shared/infrastructure/persistence/typeorm/valueObjectTransformer';
import { UserId } from '../../../domain/userId';
import { UserName } from '../../../domain/userName';
import { UserUsername } from '../../../domain/userUsername';
import { UserEmail } from '../../../domain/userEmail';
import { UserPassword } from '../../../domain/userPassword';
import { UserRole, UserRoleEnum } from '../../../domain/userRole';

export const UserEntity = new EntitySchema<User>({
  name: 'User',
  tableName: 'users',
  target: User,
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(UserId),
    },
    name: {
      type: String,
      transformer: ValueObjectTransformer(UserName),
    },
    username: {
      type: String,
      unique: true,
      transformer: ValueObjectTransformer(UserUsername),
    },
    email: {
      type: String,
      unique: true,
      transformer: ValueObjectTransformer(UserEmail),
    },
    password: {
      type: String,
      transformer: ValueObjectTransformer(UserPassword),
    },
    role: {
      type: 'enum',
      enum: UserRoleEnum,
      transformer: ValueObjectTransformer(UserRole),
    },
    createdAt: {
      type: 'timestamp',
      createDate: true,
      name: 'created_at',
    },
    updatedAt: {
      type: 'timestamp',
      updateDate: true,
      name: 'updated_at',
    }
  }
});
