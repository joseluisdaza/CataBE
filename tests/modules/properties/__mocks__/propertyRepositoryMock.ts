import { Nullable } from '../../../../src/modules/shared/domain/nullable';
import { Property } from '../../../../src/modules/properties/domain/property';
import { PropertyId } from '../../../../src/modules/properties/domain/propertyId';
import { PropertyCadastralCode } from '../../../../src/modules/properties/domain/propertyCadastralCode';
import { PropertyRepository } from '../../../../src/modules/properties/domain/propertyRepository';

export class PropertyRepositoryMock implements PropertyRepository {
  private readonly mockSave = jest.fn();
  private readonly mockFindById = jest.fn();
  private readonly mockFindByCodigo = jest.fn();
  private readonly mockFindAll = jest.fn();
  private readonly mockDelete = jest.fn();

  async save(property: Property): Promise<void> {
    await this.mockSave(property);
  }

  async findById(id: PropertyId): Promise<Nullable<Property>> {
    return await this.mockFindById(id);
  }

  async findByCodigoCatastral(code: PropertyCadastralCode): Promise<Nullable<Property>> {
    return await this.mockFindByCodigo(code);
  }

  async findAll(): Promise<Property[]> {
    return await this.mockFindAll();
  }

  async delete(id: PropertyId): Promise<void> {
    await this.mockDelete(id);
  }

  whenFindByIdReturn(property: Nullable<Property>): void {
    this.mockFindById.mockReturnValue(property);
  }

  whenFindByCodigoReturn(property: Nullable<Property>): void {
    this.mockFindByCodigo.mockReturnValue(property);
  }

  whenFindAllReturn(properties: Property[]): void {
    this.mockFindAll.mockReturnValue(properties);
  }

  assertDeleteCalledWith(id: PropertyId): void {
    const calls = this.mockDelete.mock.calls;
    const last = calls[calls.length - 1]?.[0];
    expect(last).toEqual(id);
  }

  assertLastSavedPropertyIs(expected: Property): void {
    const calls = this.mockSave.mock.calls;
    const last = calls[calls.length - 1]?.[0];
    expect(last).toEqual(expected);
  }
}
