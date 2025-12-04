import InMemoryPropertyRepository from '../../../../../src/modules/properties/infrastructure/persistence/inMemoryPropertyRepository';
import { PropertyMother } from '../../domain/propertyMother';
import { PropertyIdMother } from '../../domain/propertyIdMother';

describe('InMemoryPropertyRepository', () => {
  it('should save and find by id', async () => {
    const repo = new InMemoryPropertyRepository();
    const p = PropertyMother.random();
    await repo.save(p);
    const found = await repo.findById(p.id);
    expect(found).toEqual(p);
  });

  it('should find by codigo catastral', async () => {
    const repo = new InMemoryPropertyRepository();
    const p = PropertyMother.random();
    await repo.save(p);
    const found = await repo.findByCodigoCatastral(p.cadastralCode);
    expect(found).toEqual(p);
  });

  it('should return all properties', async () => {
    const repo = new InMemoryPropertyRepository();
    await repo.save(PropertyMother.random());
    await repo.save(PropertyMother.random());
    const all = await repo.findAll();
    expect(all.length).toBe(2);
  });

  it('should delete a property', async () => {
    const repo = new InMemoryPropertyRepository();
    const p = PropertyMother.random();
    await repo.save(p);
    await repo.delete(p.id);
    const found = await repo.findById(p.id);
    expect(found).toBeNull();
  });
});
