import PropertyFinder from '../../../../src/modules/properties/application/propertyFinder';
import { PropertyRepositoryMock } from '../__mocks__/propertyRepositoryMock';
import { PropertyMother } from '../domain/propertyMother';
import { PropertyIdMother } from '../domain/propertyIdMother';

let repository: PropertyRepositoryMock;
let finder: PropertyFinder;

beforeEach(() => {
  repository = new PropertyRepositoryMock();
  finder = new PropertyFinder(repository);
});

describe('PropertyFinder', () => {
  it('should find existing property by id', async () => {
    const p = PropertyMother.random();
    repository.whenFindByIdReturn(p);
    const found = await finder.run(p.id.value);
    expect(found?.id.value).toBe(p.id.value);
  });

  it('should return null if not found', async () => {
    repository.whenFindByIdReturn(null);
    const id = PropertyIdMother.random();
    const found = await finder.run(id.value);
    expect(found).toBeNull();
  });
});
