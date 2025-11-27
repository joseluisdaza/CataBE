import { Nullable } from '../../../../src/modules/shared/domain/nullable';
import { User } from '../../../../src/modules/users/domain/user';
import { UserId } from '../../../../src/modules/users/domain/userId';
import { UserEmail } from '../../../../src/modules/users/domain/userEmail';
import { UserUsername } from '../../../../src/modules/users/domain/userUsername';
import { UserRepository } from '../../../../src/modules/users/domain/userRepository';

export class UserRepositoryMock implements UserRepository {
  private readonly mockSave = jest.fn();
  private readonly mockFindById = jest.fn();
  private readonly mockFindByEmail = jest.fn();
  private readonly mockFindByUsername = jest.fn();

  async save(user: User): Promise<void> {
    await this.mockSave(user);
  }

  async findById(id: UserId): Promise<Nullable<User>> {
    return await this.mockFindById(id);
  }

  async findByEmail(email: UserEmail): Promise<Nullable<User>> {
    return await this.mockFindByEmail(email);
  }

  async findByUsername(username: UserUsername): Promise<Nullable<User>> {
    return await this.mockFindByUsername(username);
  }

  assertLastSavedUserIs(expected: User): void {
    const mock = this.mockSave.mock;
    const lastSavedUser = (mock.calls[mock.calls.length - 1] as User[])[0];
    expect(lastSavedUser).toBeInstanceOf(User);
    expect(lastSavedUser.id).toEqual(expected.id);
  }

  whenFindByEmailReturn(user: Nullable<User>): void {
    this.mockFindByEmail.mockReturnValue(user);
  }

  whenFindByUsernameReturn(user: Nullable<User>): void {
    this.mockFindByUsername.mockReturnValue(user);
  }

  whenFindByIdReturn(user: Nullable<User>): void {
    this.mockFindById.mockReturnValue(user);
  }
}
