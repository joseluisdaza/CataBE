import { Nullable } from '../../shared/domain/nullable';
import { User } from '../domain/user';
import { UserId } from '../domain/userId';
import { UserRepository } from '../domain/userRepository';

export default class UserFinder {
  private readonly repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async run(id: string): Promise<Nullable<User>> {
    return await this.repository.findById(new UserId(id));
  }
}
