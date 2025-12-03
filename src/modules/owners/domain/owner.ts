import { AggregateRoot } from '../../shared/domain/aggregateRoot';
import { OwnerId } from './ownerId';
import { OwnerName } from './ownerName';
import { OwnerCiNit } from './ownerCiNit';
import { OwnerPhone } from './ownerPhone';

export class Owner extends AggregateRoot {
  readonly id: OwnerId;
  readonly name: OwnerName;
  readonly ciNit: OwnerCiNit;
  readonly phone: OwnerPhone;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;

  constructor(
    id: OwnerId,
    name: OwnerName,
    ciNit: OwnerCiNit,
    phone: OwnerPhone,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super();
    this.id = id;
    this.name = name;
    this.ciNit = ciNit;
    this.phone = phone;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromPrimitives(plainData: {
    id: string;
    name: string;
    ciNit: string;
    phone: string;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    return new Owner(
      new OwnerId(plainData.id),
      new OwnerName(plainData.name),
      new OwnerCiNit(plainData.ciNit),
      new OwnerPhone(plainData.phone),
      plainData.createdAt,
      plainData.updatedAt
    );
  }

  toPrimitives(): any {
    return {
      id: this.id.value,
      name: this.name.value,
      ciNit: this.ciNit.value,
      phone: this.phone.value,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
