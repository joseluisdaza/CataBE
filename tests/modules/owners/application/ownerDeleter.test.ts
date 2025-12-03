import OwnerDeleter from '../../../../src/modules/owners/application/ownerDeleter';
import { OwnerRepositoryMock } from '../__mocks__/ownerRepositoryMock';
import { OwnerMother } from '../domain/ownerMother';
import { OwnerIdMother } from '../domain/ownerIdMother';

describe('OwnerDeleter', () => {
  it('should delete an existing owner', async () => {
    const repository = new OwnerRepositoryMock();
    const owner = OwnerMother.random();
    repository.whenFindByIdReturn(owner);
    const deleter = new OwnerDeleter(repository);

    await deleter.run(owner.id.value);

    repository.assertDeleteCalledWith(owner.id);
  });

  it('should do nothing if owner does not exist', async () => {
    const repository = new OwnerRepositoryMock();
    const id = OwnerIdMother.random();
    repository.whenFindByIdReturn(null);
    const deleter = new OwnerDeleter(repository);

    await expect(deleter.run(id.value)).resolves.toBeUndefined();
  });
});
