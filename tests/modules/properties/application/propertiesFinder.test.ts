import PropertiesFinder from '../../../../src/modules/properties/application/propertiesFinder';
import { PropertyRepositoryMock } from '../__mocks__/propertyRepositoryMock';
import { PropertyMother } from '../domain/propertyMother';

let repository: PropertyRepositoryMock;
let finder: PropertiesFinder;

beforeEach(() => {
  repository = new PropertyRepositoryMock();
  finder = new PropertiesFinder(repository);
});

describe('PropertiesFinder', () => {
  it('should return all properties', async () => {
    const properties = [PropertyMother.random(), PropertyMother.random()];
    repository.whenFindAllReturn(properties);
    const result = await finder.run();
    expect(result.length).toBe(2);
    expect(result[0].id.value).toBe(properties[0].id.value);
  });
});
