import { getContainer, initializeContainer } from '../../../../../src/api/shared/dependency-injection/container';
import { UserRepository } from '../../../../../src/modules/users/domain/userRepository';
import { EnvironmentArranger } from '../../../shared/infrastructure/arranger/environmentArranger';
import { UserMother } from '../../domain/userMother';
import { UserIdMother } from '../../domain/userIdMother';
import { UserEmailMother } from '../../domain/userEmailMother';
import { UserUsernameMother } from '../../domain/userUsernameMother';

let repository: UserRepository;
let environmentArranger: Promise<EnvironmentArranger>;

beforeAll(async () => {
  await initializeContainer();

  const container = getContainer();
  repository = container.get('Users.domain.UserRepository');
  environmentArranger = container.get('Shared.EnvironmentArranger');
});

beforeEach(async() => {
  await (await environmentArranger).arrangeTable('users');
});

afterAll(async () => {
  await (await environmentArranger).arrangeTable('users');
  await (await environmentArranger).close();
});

describe('TypeOrmUserRepository', () => {
  describe('#save', () => {
    it('should save a user', async () => {
      const user = UserMother.random();

      await repository.save(user);

      const savedUser = await repository.findById(user.id);
      expect(savedUser).toBeDefined();
      expect(savedUser?.id.value).toBe(user.id.value);
    });
  });

  describe('#findById', () => {
    it('should find a user by id', async () => {
      const user = UserMother.random();
      await repository.save(user);

      const foundUser = await repository.findById(user.id);

      expect(foundUser).toBeDefined();
      expect(foundUser?.id.value).toBe(user.id.value);
    });

    it('should return null if user is not found', async () => {
      const userId = UserIdMother.random();

      const user = await repository.findById(userId);

      expect(user).toBeNull();
    });
  });

  describe('#findByEmail', () => {
    it('should find a user by email', async () => {
      const user = UserMother.random();
      await repository.save(user);

      const foundUser = await repository.findByEmail(user.email);

      expect(foundUser).toBeDefined();
      expect(foundUser?.email.value).toBe(user.email.value);
    });

    it('should return null if user is not found', async () => {
      const email = UserEmailMother.random();

      const user = await repository.findByEmail(email);

      expect(user).toBeNull();
    });
  });

  describe('#findByUsername', () => {
    it('should find a user by username', async () => {
      const user = UserMother.random();
      await repository.save(user);

      const foundUser = await repository.findByUsername(user.username);

      expect(foundUser).toBeDefined();
      expect(foundUser?.username.value).toBe(user.username.value);
    });

    it('should return null if user is not found', async () => {
      const username = UserUsernameMother.random();

      const user = await repository.findByUsername(username);

      expect(user).toBeNull();
    });
  });
});
