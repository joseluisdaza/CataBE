import PropertyUpdater from '../../../../src/modules/properties/application/propertyUpdater';
import { PropertyRepositoryMock } from '../__mocks__/propertyRepositoryMock';
import { PropertyMother } from '../domain/propertyMother';
import { CreatePropertyRequestMother } from './createPropertyRequestMother';

describe('PropertyUpdater', () => {
  it('creates when property not exists and code unique', async () => {
    const repo = new PropertyRepositoryMock();
    repo.whenFindByCodigoReturn(null);
    const updater = new PropertyUpdater(repo);

    const request = CreatePropertyRequestMother.random();
    await updater.run(request);

    repo.assertLastSavedPropertyIs(PropertyMother.fromRequest(request));
  });

  it('updates when property exists and code belongs to same property', async () => {
    const repo = new PropertyRepositoryMock();
    const existing = PropertyMother.random();
    repo.whenFindByCodigoReturn(existing);
    const updater = new PropertyUpdater(repo);

    const request = {
      id: existing.id.value,
      unitNumber: existing.unitNumber.value,
      cadastralCode: existing.cadastralCode.value,
      municipality: existing.municipality.value,
      propertyClass: existing.propertyClass.value,
      area: existing.area.value,
      taxZone: existing.taxZone.value,
      propertyType: existing.propertyType.value,
      location: existing.location.value,
    };

    await expect(updater.run(request)).resolves.toBeUndefined();
  });

  it('throws when code belongs to another property', async () => {
    const repo = new PropertyRepositoryMock();
    const existing = PropertyMother.random();
    const other = PropertyMother.random();
    repo.whenFindByCodigoReturn(other);
    const updater = new PropertyUpdater(repo);

    const request = {
      id: existing.id.value,
      unitNumber: existing.unitNumber.value,
      cadastralCode: other.cadastralCode.value,
      municipality: existing.municipality.value,
      propertyClass: existing.propertyClass.value,
      area: existing.area.value,
      taxZone: existing.taxZone.value,
      propertyType: existing.propertyType.value,
      location: existing.location.value,
    };

    await expect(updater.run(request)).rejects.toThrow('Property with code');
  });
});
