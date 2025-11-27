import InMemoryUserRepository from '../../../../../src/modules/users/infrastructure/persistence/inMemoryUserRepository';
import { UserMother } from '../../domain/userMother';
import { UserIdMother } from '../../domain/userIdMother';
import { UserEmailMother } from '../../domain/userEmailMother';
import { UserUsernameMother } from '../../domain/userUsernameMother';

describe('InMemoryUserRepository', () => {

  it('should save a user', async () => {
    const repository = new InMemoryUserRepository();
    const expectedUser = UserMother.random();

    await repository.save(expectedUser);

    const user = await repository.findById(expectedUser.id);
    expect(user).toEqual(expectedUser);
  });

  it('should find a user by id', async () => {
    const repository = new InMemoryUserRepository();
    const expectedUser = UserMother.random();
    await repository.save(expectedUser);

    const user = await repository.findById(expectedUser.id);

    expect(user).toEqual(expectedUser);
  });

  it('should return null if user is not found by id', async () => {
    const repository = new InMemoryUserRepository();
    const userId = UserIdMother.random();

    const user = await repository.findById(userId);

    expect(user).toBeNull();
  });

  it('should find a user by email', async () => {
    const repository = new InMemoryUserRepository();
    const expectedUser = UserMother.random();
    await repository.save(expectedUser);

    const user = await repository.findByEmail(expectedUser.email);

    expect(user).toEqual(expectedUser);
  });

  it('should return null if user is not found by email', async () => {
    const repository = new InMemoryUserRepository();
    const email = UserEmailMother.random();

    const user = await repository.findByEmail(email);

    expect(user).toBeNull();
  });

  it('should find a user by username', async () => {
    const repository = new InMemoryUserRepository();
    const expectedUser = UserMother.random();
    await repository.save(expectedUser);

    const user = await repository.findByUsername(expectedUser.username);

    expect(user).toEqual(expectedUser);
  });

  it('should return null if user is not found by username', async () => {
    const repository = new InMemoryUserRepository();
    const username = UserUsernameMother.random();

    const user = await repository.findByUsername(username);

    expect(user).toBeNull();
  });

  it('should update an existing user', async () => {
    const repository = new InMemoryUserRepository();
    const user = UserMother.random();
    await repository.save(user);

    const updatedUser = UserMother.create(
      user.id,
      user.name,
      user.username,
      user.email,
      user.password,
      user.role
    );
    await repository.save(updatedUser);

    const foundUser = await repository.findById(user.id);
    expect(foundUser).toEqual(updatedUser);
  });

});
