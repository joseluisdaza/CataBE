import OwnerRegistrar from '../../../../src/modules/owners/application/ownerRegistrar';
import { OwnerNameLengthExceeded } from '../../../../src/modules/owners/domain/ownerNameLengthExceeded';
import { OwnerCiNitNotValid } from '../../../../src/modules/owners/domain/ownerCiNitNotValid';
import { OwnerPhoneNotValid } from '../../../../src/modules/owners/domain/ownerPhoneNotValid';
import { OwnerRepositoryMock } from '../__mocks__/ownerRepositoryMock';
import { OwnerMother } from '../domain/ownerMother';
import { CreateOwnerRequestMother } from './createOwnerRequestMother';

let repository: OwnerRepositoryMock;
let registrar: OwnerRegistrar;

beforeEach(() => {
  repository = new OwnerRepositoryMock();
  registrar = new OwnerRegistrar(repository);
});

describe('OwnerRegistrar', () => {
  it('should register a valid owner', async () => {
    const request = CreateOwnerRequestMother.random();

    repository.whenFindByCiNitReturn(null);

    await registrar.run(request);

    repository.assertLastSavedOwnerIs(OwnerMother.fromRequest(request));
  });

  it('should throw error if CI/NIT already exists', async () => {
    const request = CreateOwnerRequestMother.random();
    const existingOwner = OwnerMother.fromRequest(request);

    repository.whenFindByCiNitReturn(existingOwner);

    const expectedMessage = `Owner with CI/NIT ${existingOwner.ciNit.value} already exists`;
    await expect(registrar.run(request)).rejects.toThrow(expectedMessage);
  });

  it('should throw error if owner name length is exceeded', () => {
    expect(() => {
      const request = CreateOwnerRequestMother.invalidName();
      OwnerMother.fromRequest(request);
    }).toThrow(OwnerNameLengthExceeded);
  });

  it('should throw error if CI/NIT is not valid', () => {
    expect(() => {
      const request = CreateOwnerRequestMother.invalidCiNit();
      OwnerMother.fromRequest(request);
    }).toThrow(OwnerCiNitNotValid);
  });

  it('should throw error if phone is not valid', () => {
    expect(() => {
      const request = CreateOwnerRequestMother.invalidPhone();
      OwnerMother.fromRequest(request);
    }).toThrow(OwnerPhoneNotValid);
  });
});
