import { User } from '../domain/user';
import { UserId } from '../domain/userId';
import { UserName } from '../domain/userName';
import { UserUsername } from '../domain/userUsername';
import { UserEmail } from '../domain/userEmail';
import { UserPassword } from '../domain/userPassword';
import { UserRole } from '../domain/userRole';
import { UserRepository } from '../domain/userRepository';
import { UserPasswordHasher } from '../domain/userPasswordHasher';
import { CreateUserRequest } from './createUserRequest';

export default class UserRegistrar {
  private readonly repository: UserRepository;
  private readonly passwordHasher: UserPasswordHasher;

  constructor(repository: UserRepository, passwordHasher: UserPasswordHasher) {
    this.repository = repository;
    this.passwordHasher = passwordHasher;
  }

  async run(request: CreateUserRequest): Promise<void> {
    const existingUserByEmail = await this.repository.findByEmail(new UserEmail(request.email));
    if (existingUserByEmail) {
      throw new Error(`User with email ${request.email} already exists`);
    }

    const existingUserByUsername = await this.repository.findByUsername(new UserUsername(request.username));
    if (existingUserByUsername) {
      throw new Error(`User with username ${request.username} already exists`);
    }

    const hashedPassword = await this.passwordHasher.hash(request.password);

    const user = new User(
      new UserId(request.id),
      new UserName(request.name),
      new UserUsername(request.username),
      new UserEmail(request.email),
      UserPassword.fromHash(hashedPassword),
      new UserRole(request.role)
    );

    await this.repository.save(user);
  }
}
