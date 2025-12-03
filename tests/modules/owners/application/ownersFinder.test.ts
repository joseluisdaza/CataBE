import OwnersFinder from '../../../../src/modules/owners/application/ownersFinder';
import { OwnerRepositoryMock } from '../__mocks__/ownerRepositoryMock';
import { OwnerMother } from '../domain/ownerMother';

let repository: OwnerRepositoryMock;
let finder: OwnersFinder;

beforeEach(() => {
  repository = new OwnerRepositoryMock();
  finder = new OwnersFinder(repository);
});

describe('OwnersFinder', () => {
  it('should return all owners', async () => {
    const owners = [OwnerMother.random(), OwnerMother.random()];
    repository.whenFindAllReturn(owners);

    const result = await finder.run();
    expect(result.length).toBe(2);
    expect(result[0].id.value).toBe(owners[0].id.value);
  });
});
