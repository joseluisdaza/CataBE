import UserAuthenticator from '../../../../src/modules/users/application/userAuthenticator';
import { UserRepositoryMock } from '../__mocks__/userRepositoryMock';
import { UserPasswordHasherMock } from '../__mocks__/userPasswordHasherMock';
import { UserMother } from '../domain/userMother';
import { UserEmailMother } from '../domain/userEmailMother';

let repository: UserRepositoryMock;
let passwordHasher: UserPasswordHasherMock;
let authenticator: UserAuthenticator;

beforeEach(() => {
  repository = new UserRepositoryMock();
  passwordHasher = new UserPasswordHasherMock();
  authenticator = new UserAuthenticator(repository, passwordHasher);
});

describe('UserAuthenticator', () => {
  it('should authenticate a user with valid credentials', async () => {
    const user = UserMother.random();
    const plainPassword = 'password123';

    repository.whenFindByEmailReturn(user);
    passwordHasher.whenCompareReturn(true);

    const authenticatedUser = await authenticator.run({
      email: user.email.value,
      password: plainPassword,
    });

    expect(authenticatedUser).toEqual({
      id: user.id.value,
      name: user.name.value,
      username: user.username.value,
      email: user.email.value,
      role: user.role.value,
    });
  });

  it('should throw if user is not found', async () => {
    const email = UserEmailMother.random();
    repository.whenFindByEmailReturn(null);

    await expect(
      authenticator.run({
        email: email.value,
        password: 'password123',
      })
    ).rejects.toThrow();
  });

  it('should throw if password is incorrect', async () => {
    const user = UserMother.random();
    const plainPassword = 'wrongpassword';

    repository.whenFindByEmailReturn(user);
    passwordHasher.whenCompareReturn(false);

    await expect(
      authenticator.run({
        email: user.email.value,
        password: plainPassword,
      })
    ).rejects.toThrow();
  });
});
