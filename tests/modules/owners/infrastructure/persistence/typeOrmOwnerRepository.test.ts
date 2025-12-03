import { getContainer, initializeContainer } from '../../../../../src/api/shared/dependency-injection/container';
import { OwnerRepository } from '../../../../../src/modules/owners/domain/ownerRepository';
import { EnvironmentArranger } from '../../../shared/infrastructure/arranger/environmentArranger';
import { OwnerMother } from '../../domain/ownerMother';
import { OwnerIdMother } from '../../domain/ownerIdMother';
import { OwnerCiNitMother } from '../../domain/ownerCiNitMother';

let repository: OwnerRepository;
let environmentArranger: Promise<EnvironmentArranger>;

beforeAll(async () => {
  await initializeContainer();

  const container = getContainer();
  repository = container.get('Owners.domain.OwnerRepository');
  environmentArranger = container.get('Shared.EnvironmentArranger');
});

beforeEach(async() => {
  await (await environmentArranger).arrangeTable('owners');
});

afterAll(async () => {
  await (await environmentArranger).arrangeTable('owners');
  await (await environmentArranger).close();
});

describe('TypeOrmOwnerRepository', () => {
  describe('#save', () => {
    it('should save an owner', async () => {
      const owner = OwnerMother.random();

      await repository.save(owner);

      const saved = await repository.findById(owner.id);
      expect(saved).toBeDefined();
      expect(saved?.id.value).toBe(owner.id.value);
    });
  });

  describe('#findById', () => {
    it('should find an owner by id', async () => {
      const owner = OwnerMother.random();
      await repository.save(owner);

      const found = await repository.findById(owner.id);
      expect(found).toBeDefined();
      expect(found?.id.value).toBe(owner.id.value);
    });

    it('should return null if not found', async () => {
      const id = OwnerIdMother.random();
      const owner = await repository.findById(id);
      expect(owner).toBeNull();
    });
  });

  describe('#findByCiNit', () => {
    it('should find an owner by ciNit', async () => {
      const owner = OwnerMother.random();
      await repository.save(owner);

      const found = await repository.findByCiNit(owner.ciNit);
      expect(found).toBeDefined();
      expect(found?.ciNit.value).toBe(owner.ciNit.value);
    });

    it('should return null if not found', async () => {
      const ciNit = OwnerCiNitMother.random();
      const owner = await repository.findByCiNit(ciNit);
      expect(owner).toBeNull();
    });
  });

  describe('#findAll', () => {
    it('should return all owners', async () => {
      const owner1 = OwnerMother.random();
      const owner2 = OwnerMother.random();
      await repository.save(owner1);
      await repository.save(owner2);

      const owners = await repository.findAll();
      expect(owners.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('#delete', () => {
    it('should delete an owner', async () => {
      const owner = OwnerMother.random();
      await repository.save(owner);

      await repository.delete(owner.id);

      const found = await repository.findById(owner.id);
      expect(found).toBeNull();
    });
  });
});
