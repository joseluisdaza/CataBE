import { Nullable } from '../../../../src/modules/shared/domain/nullable';
import { Owner } from '../../../../src/modules/owners/domain/owner';
import { OwnerId } from '../../../../src/modules/owners/domain/ownerId';
import { OwnerCiNit } from '../../../../src/modules/owners/domain/ownerCiNit';
import { OwnerRepository } from '../../../../src/modules/owners/domain/ownerRepository';

export class OwnerRepositoryMock implements OwnerRepository {
  private readonly mockSave = jest.fn();
  private readonly mockFindById = jest.fn();
  private readonly mockFindByCiNit = jest.fn();
  private readonly mockFindAll = jest.fn();
  private readonly mockDelete = jest.fn();

  async save(owner: Owner): Promise<void> {
    await this.mockSave(owner);
  }

  async findById(id: OwnerId): Promise<Nullable<Owner>> {
    return await this.mockFindById(id);
  }

  async findByCiNit(ciNit: OwnerCiNit): Promise<Nullable<Owner>> {
    return await this.mockFindByCiNit(ciNit);
  }

  async findAll(): Promise<Owner[]> {
    return await this.mockFindAll();
  }

  async delete(id: OwnerId): Promise<void> {
    await this.mockDelete(id);
  }

  assertLastSavedOwnerIs(expected: Owner): void {
    const mock = this.mockSave.mock;
    const lastSaved = (mock.calls[mock.calls.length - 1] as Owner[])[0];
    expect(lastSaved).toBeInstanceOf(Owner);
    expect(lastSaved.id).toEqual(expected.id);
  }

  whenFindByCiNitReturn(owner: Nullable<Owner>): void {
    this.mockFindByCiNit.mockReturnValue(owner);
  }

  whenFindByIdReturn(owner: Nullable<Owner>): void {
    this.mockFindById.mockReturnValue(owner);
  }

  whenFindAllReturn(owners: Owner[]): void {
    this.mockFindAll.mockReturnValue(owners);
  }

  assertDeleteCalledWith(id: OwnerId): void {
    const calls = this.mockDelete.mock.calls;
    const last = calls[calls.length - 1]?.[0];
    expect(last).toEqual(id);
  }
}
