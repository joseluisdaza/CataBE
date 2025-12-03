import InMemoryOwnerRepository from '../../../../../src/modules/owners/infrastructure/persistence/inMemoryOwnerRepository';
import { OwnerMother } from '../../domain/ownerMother';
import { OwnerIdMother } from '../../domain/ownerIdMother';
import { OwnerCiNitMother } from '../../domain/ownerCiNitMother';

describe('InMemoryOwnerRepository', () => {

  it('should save an owner', async () => {
    const repository = new InMemoryOwnerRepository();
    const expected = OwnerMother.random();

    await repository.save(expected);

    const owner = await repository.findById(expected.id);
    expect(owner).toEqual(expected);
  });

  it('should find an owner by id', async () => {
    const repository = new InMemoryOwnerRepository();
    const expected = OwnerMother.random();
    await repository.save(expected);

    const owner = await repository.findById(expected.id);
    expect(owner).toEqual(expected);
  });

  it('should return null if owner not found by id', async () => {
    const repository = new InMemoryOwnerRepository();
    const id = OwnerIdMother.random();

    const owner = await repository.findById(id);
    expect(owner).toBeNull();
  });

  it('should find an owner by ciNit', async () => {
    const repository = new InMemoryOwnerRepository();
    const expected = OwnerMother.random();
    await repository.save(expected);

    const owner = await repository.findByCiNit(expected.ciNit);
    expect(owner).toEqual(expected);
  });

  it('should return null if owner not found by ciNit', async () => {
    const repository = new InMemoryOwnerRepository();
    const ciNit = OwnerCiNitMother.random();

    const owner = await repository.findByCiNit(ciNit);
    expect(owner).toBeNull();
  });

  it('should return all owners', async () => {
    const repository = new InMemoryOwnerRepository();
    const owner1 = OwnerMother.random();
    const owner2 = OwnerMother.random();
    await repository.save(owner1);
    await repository.save(owner2);

    const owners = await repository.findAll();
    expect(owners.length).toBe(2);
  });
});
