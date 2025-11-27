import UserFinder from '../../../../src/modules/users/application/userFinder';
import { UserRepositoryMock } from '../__mocks__/userRepositoryMock';
import { UserMother } from '../domain/userMother';
import { UserIdMother } from '../domain/userIdMother';

let repository: UserRepositoryMock;
let finder: UserFinder;

beforeEach(() => {
  repository = new UserRepositoryMock();
  finder = new UserFinder(repository);
});

describe('UserFinder', () => {
  it('should find a user by id', async () => {
    const user = UserMother.random();
    repository.whenFindByIdReturn(user);

    const foundUser = await finder.run(user.id.value);

    expect(foundUser).toEqual(user);
  });

  it('should return null if user is not found', async () => {
    const userId = UserIdMother.random();
    repository.whenFindByIdReturn(null);

    const foundUser = await finder.run(userId.value);

    expect(foundUser).toBeNull();
  });
});
