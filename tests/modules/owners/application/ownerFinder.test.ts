import OwnerFinder from '../../../../src/modules/owners/application/ownerFinder';
import { OwnerRepositoryMock } from '../__mocks__/ownerRepositoryMock';
import { OwnerMother } from '../domain/ownerMother';
import { OwnerIdMother } from '../domain/ownerIdMother';

let repository: OwnerRepositoryMock;
let finder: OwnerFinder;

beforeEach(() => {
  repository = new OwnerRepositoryMock();
  finder = new OwnerFinder(repository);
});

describe('OwnerFinder', () => {
  it('should find an existing owner by id', async () => {
    const owner = OwnerMother.random();
    repository.whenFindByIdReturn(owner);

    const result = await finder.run(owner.id.value);
    expect(result?.id.value).toBe(owner.id.value);
  });

  it('should return null if owner not found', async () => {
    repository.whenFindByIdReturn(null);
    const id = OwnerIdMother.random();

    const result = await finder.run(id.value);
    expect(result).toBeNull();
  });
});
