import { NewableClass } from '../../../domain/newableClass';
import { ValueObject } from '../../../domain/value-object/valueObject';

export const ValueObjectTransformer = (ValueObjectClass: NewableClass<ValueObject<any>>) => ({
  to: (value: ValueObject<any> | null | undefined): any => (value == null ? value : value.value),
  from: (value: any): ValueObject<any> | null | undefined => (value == null ? value : new ValueObjectClass(value)),
});
