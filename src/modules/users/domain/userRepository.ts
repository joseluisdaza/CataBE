import { User } from './user';
import { UserId } from './userId';
import { UserEmail } from './userEmail';
import { UserUsername } from './userUsername';
import { Nullable } from '../../shared/domain/nullable';

export interface UserRepository {
  save(user: User): Promise<void>;
  findById(id: UserId): Promise<Nullable<User>>;
  findByEmail(email: UserEmail): Promise<Nullable<User>>;
  findByUsername(username: UserUsername): Promise<Nullable<User>>;
}
