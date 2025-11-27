import { UserEmail } from '../domain/userEmail';
import { UserRepository } from '../domain/userRepository';
import { UserPasswordHasher } from '../domain/userPasswordHasher';

export interface AuthenticateUserRequest {
  email: string;
  password: string;
}

export interface AuthenticatedUser {
  id: string;
  name: string;
  username: string;
  email: string;
  role: string;
}

export default class UserAuthenticator {
  private readonly repository: UserRepository;
  private readonly passwordHasher: UserPasswordHasher;

  constructor(repository: UserRepository, passwordHasher: UserPasswordHasher) {
    this.repository = repository;
    this.passwordHasher = passwordHasher;
  }

  async run(request: AuthenticateUserRequest): Promise<AuthenticatedUser> {
    const user = await this.repository.findByEmail(new UserEmail(request.email));

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await this.passwordHasher.compare(
      request.password,
      user.password.value
    );

    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    return {
      id: user.id.value,
      name: user.name.value,
      username: user.username.value,
      email: user.email.value,
      role: user.role.value,
    };
  }
}
