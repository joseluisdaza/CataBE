import { Nullable } from '../../../shared/domain/nullable';
import { User } from '../../domain/user';
import { UserId } from '../../domain/userId';
import { UserEmail } from '../../domain/userEmail';
import { UserUsername } from '../../domain/userUsername';
import { UserRepository } from '../../domain/userRepository';

export default class InMemoryUserRepository implements UserRepository {
  private readonly users: User[] = [];

  async save(user: User): Promise<void> {
    const existingIndex = this.users.findIndex(u => u.id.value === user.id.value);
    
    if (existingIndex !== -1) {
      this.users[existingIndex] = user;
    } else {
      this.users.push(user);
    }
  }

  async findById(id: UserId): Promise<Nullable<User>> {
    const user = this.users.find(u => u.id.value === id.value);
    return user || null;
  }

  async findByEmail(email: UserEmail): Promise<Nullable<User>> {
    const user = this.users.find(u => u.email.value === email.value);
    return user || null;
  }

  async findByUsername(username: UserUsername): Promise<Nullable<User>> {
    const user = this.users.find(u => u.username.value === username.value);
    return user || null;
  }
}
