import PropertyDeleter from '../../../../src/modules/properties/application/propertyDeleter';
import { PropertyRepositoryMock } from '../__mocks__/propertyRepositoryMock';
import { PropertyMother } from '../domain/propertyMother';
import { PropertyIdMother } from '../domain/propertyIdMother';

describe('PropertyDeleter', () => {
  it('should delete an existing property', async () => {
    const repo = new PropertyRepositoryMock();
    const p = PropertyMother.random();
    repo.whenFindByIdReturn(p);
    const deleter = new PropertyDeleter(repo);
    await deleter.run(p.id.value);
    repo.assertDeleteCalledWith(p.id);
  });

  it('should do nothing if property does not exist', async () => {
    const repo = new PropertyRepositoryMock();
    const id = PropertyIdMother.random();
    repo.whenFindByIdReturn(null);
    const deleter = new PropertyDeleter(repo);
    await expect(deleter.run(id.value)).resolves.toBeUndefined();
  });
});
