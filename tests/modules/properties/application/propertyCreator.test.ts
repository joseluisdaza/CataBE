import PropertyCreator from '../../../../src/modules/properties/application/propertyCreator';
import { PropertyRepositoryMock } from '../__mocks__/propertyRepositoryMock';
import { PropertyMother } from '../domain/propertyMother';
import { CreatePropertyRequestMother } from './createPropertyRequestMother';

describe('PropertyCreator', () => {
  it('registers a property when code is unique', async () => {
    const repo = new PropertyRepositoryMock();
    repo.whenFindByCodigoReturn(null);
    const creator = new PropertyCreator(repo);

    const request = CreatePropertyRequestMother.random();
    await creator.run(request);

    repo.assertLastSavedPropertyIs(PropertyMother.fromRequest(request));
  });

  it('throws when cadastral code already exists', async () => {
    const repo = new PropertyRepositoryMock();
    const existing = PropertyMother.random();
    repo.whenFindByCodigoReturn(existing);
    const creator = new PropertyCreator(repo);

    const request = CreatePropertyRequestMother.random();
    const badReq = { ...request, cadastralCode: existing.cadastralCode.value };
    await expect(creator.run(badReq)).rejects.toThrow('Property with code');
  });
});
