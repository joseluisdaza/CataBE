import UserRegistrar from '../../../../src/modules/users/application/userRegistrar';
import { UserNameLengthExceeded } from '../../../../src/modules/users/domain/userNameLengthExceeded';
import { UserUsernameLengthExceeded } from '../../../../src/modules/users/domain/userUsernameLengthExceeded';
import { UserEmailNotValid } from '../../../../src/modules/users/domain/userEmailNotValid';
import { UserPasswordTooShort } from '../../../../src/modules/users/domain/userPasswordTooShort';
import { UserRoleNotValid } from '../../../../src/modules/users/domain/userRoleNotValid';
import { UserRepositoryMock } from '../__mocks__/userRepositoryMock';
import { UserPasswordHasherMock } from '../__mocks__/userPasswordHasherMock';
import { UserMother } from '../domain/userMother';
import { CreateUserRequestMother } from './createUserRequestMother';

let repository: UserRepositoryMock;
let passwordHasher: UserPasswordHasherMock;
let registrar: UserRegistrar;

beforeEach(() => {
  repository = new UserRepositoryMock();
  passwordHasher = new UserPasswordHasherMock();
  registrar = new UserRegistrar(repository, passwordHasher);
});

describe('UserRegistrar', () => {
  it('should register a valid user', async () => {
    const request = CreateUserRequestMother.random();
    const hashedPassword = 'hashed_' + request.password;

    repository.whenFindByEmailReturn(null);
    repository.whenFindByUsernameReturn(null);
    passwordHasher.whenHashReturn(hashedPassword);

    await registrar.run(request);

    repository.assertLastSavedUserIs(UserMother.fromRequest(request));
  });

  it('should throw error if email already exists', async () => {
    const request = CreateUserRequestMother.random();
    const existingUser = UserMother.fromRequest(request);

    repository.whenFindByEmailReturn(existingUser);

    const expectedMessage = `User with email ${existingUser.email.value} already exists`;
    await expect(registrar.run(request)).rejects.toThrow(expectedMessage);
  });

  it('should throw error if username already exists', async () => {
    const request = CreateUserRequestMother.random();
    const existingUser = UserMother.fromRequest(request);

    repository.whenFindByEmailReturn(null);
    repository.whenFindByUsernameReturn(existingUser);

    const expectedMessage = `User with username ${existingUser.username.value} already exists`;
    await expect(registrar.run(request)).rejects.toThrow(expectedMessage);
  });

  it('should throw error if user name length is exceeded', () => {
    expect(() => {
      const request = CreateUserRequestMother.invalidName();
      UserMother.fromRequest(request);
    }).toThrow(UserNameLengthExceeded);
  });

  it('should throw error if email is not valid', () => {
    expect(() => {
      const request = CreateUserRequestMother.invalidEmail();
      UserMother.fromRequest(request);
    }).toThrow(UserEmailNotValid);
  });

  it('should throw error if password is too short', () => {
    expect(() => {
      const request = CreateUserRequestMother.invalidPassword();
      UserMother.fromRequest(request);
    }).toThrow(UserPasswordTooShort);
  });

  it('should throw error if role is not valid', () => {
    expect(() => {
      const request = CreateUserRequestMother.invalidRole();
      UserMother.fromRequest(request);
    }).toThrow(UserRoleNotValid);
  });

  it('should throw error if username length is exceeded', () => {
    expect(() => {
      const request = CreateUserRequestMother.invalidUsername();
      UserMother.fromRequest(request);
    }).toThrow(UserUsernameLengthExceeded);
  });
});
