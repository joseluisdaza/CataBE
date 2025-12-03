import OwnerUpdater from '../../../../src/modules/owners/application/ownerUpdater';
import { OwnerRepositoryMock } from '../__mocks__/ownerRepositoryMock';
import { OwnerMother } from '../domain/ownerMother';
import { OwnerIdMother } from '../domain/ownerIdMother';

describe('OwnerUpdater', () => {
  it('creates when owner not exists and ciNit unique', async () => {
    const repo = new OwnerRepositoryMock();
    repo.whenFindByIdReturn(null);
    repo.whenFindByCiNitReturn(null);
    const updater = new OwnerUpdater(repo);

    const id = OwnerIdMother.random();
    await expect(
      updater.run({ id: id.value, name: 'Juan', ciNit: '12345678', phone: '71234567' })
    ).resolves.toBeUndefined();
  });

  it('updates when owner exists and ciNit belongs to same owner', async () => {
    const repo = new OwnerRepositoryMock();
    const existing = OwnerMother.random();
    repo.whenFindByIdReturn(existing);
    repo.whenFindByCiNitReturn(existing);
    const updater = new OwnerUpdater(repo);

    await expect(
      updater.run({ id: existing.id.value, name: 'Nuevo Nombre', ciNit: existing.ciNit.value, phone: '71234567' })
    ).resolves.toBeUndefined();
  });

  it('throws when ciNit belongs to another owner', async () => {
    const repo = new OwnerRepositoryMock();
    const existing = OwnerMother.random();
    const other = OwnerMother.random();
    repo.whenFindByIdReturn(existing);
    repo.whenFindByCiNitReturn(other);
    const updater = new OwnerUpdater(repo);

    await expect(
      updater.run({ id: existing.id.value, name: 'X', ciNit: other.ciNit.value, phone: '71234567' })
    ).rejects.toThrow('Owner with CI/NIT');
  });
});
