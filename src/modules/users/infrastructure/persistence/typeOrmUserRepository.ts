import { EntitySchema } from 'typeorm';
import { Nullable } from '../../../shared/domain/nullable';
import { TypeOrmRepository } from '../../../shared/infrastructure/persistence/typeorm/typeOrmRepository';
import { User } from '../../domain/user';
import { UserId } from '../../domain/userId';
import { UserEmail } from '../../domain/userEmail';
import { UserUsername } from '../../domain/userUsername';
import { UserRepository } from '../../domain/userRepository';
import { UserEntity } from './typeorm/userEntity';

export default class TypeOrmUserRepository extends TypeOrmRepository<User> implements UserRepository {
  public async save(user: User): Promise<void> {
    return this.persist(user);
  }

  public async findById(id: UserId): Promise<Nullable<User>> {
    const repository = await this.repository();
    const user = await repository.findOne({ where: { id: id } });
    return user;
  }

  public async findByEmail(email: UserEmail): Promise<Nullable<User>> {
    const repository = await this.repository();
    const user = await repository.findOne({ where: { email } });
    return user;
  }

  public async findByUsername(username: UserUsername): Promise<Nullable<User>> {
    const repository = await this.repository();
    const user = await repository.findOne({ where: { username } });
    return user;
  }

  protected entitySchema(): EntitySchema<User> {
    return UserEntity;
  }
}
