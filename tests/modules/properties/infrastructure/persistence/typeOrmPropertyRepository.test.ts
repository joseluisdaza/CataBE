import { getContainer, initializeContainer } from '../../../../../src/api/shared/dependency-injection/container';
import { PropertyRepository } from '../../../../../src/modules/properties/domain/propertyRepository';
import { EnvironmentArranger } from '../../../shared/infrastructure/arranger/environmentArranger';
import { PropertyMother } from '../../domain/propertyMother';
import { PropertyIdMother } from '../../domain/propertyIdMother';

let repository: PropertyRepository;
let environmentArranger: Promise<EnvironmentArranger>;

beforeAll(async () => {
  await initializeContainer();

  const container = getContainer();
  repository = container.get('Properties.domain.PropertyRepository');
  environmentArranger = container.get('Shared.EnvironmentArranger');
});

beforeEach(async() => {
  await (await environmentArranger).arrangeTable('properties');
});

afterAll(async () => {
  await (await environmentArranger).arrangeTable('properties');
  await (await environmentArranger).close();
});

describe('TypeOrmPropertyRepository', () => {
  it('should save and find by id', async () => {
    const p = PropertyMother.random();
    await repository.save(p);
    const found = await repository.findById(p.id);
    expect(found?.id.value).toBe(p.id.value);
  });

  it('should find by codigo catastral', async () => {
    const p = PropertyMother.random();
    await repository.save(p);
    const found = await repository.findByCodigoCatastral(p.cadastralCode);
    expect(found?.cadastralCode.value).toBe(p.cadastralCode.value);
  });

  it('should return all properties', async () => {
    await repository.save(PropertyMother.random());
    await repository.save(PropertyMother.random());
    const all = await repository.findAll();
    expect(all.length).toBeGreaterThanOrEqual(2);
  });

  it('should delete a property', async () => {
    const p = PropertyMother.random();
    await repository.save(p);
    await repository.delete(p.id);
    const found = await repository.findById(p.id);
    expect(found).toBeNull();
  });
});
