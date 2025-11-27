import { ValueObject } from '../../shared/domain/value-object/valueObject';
import { UserRoleNotValid } from './userRoleNotValid';

export enum UserRoleEnum {
  ADMIN = 'admin',
  VIEWER = 'viewer'
}

export class UserRole extends ValueObject<UserRoleEnum> {
  constructor(value: UserRoleEnum) {
    super(value);
    this.ensureIsValidRole(value);
  }

  private ensureIsValidRole(value: UserRoleEnum): void {
    if (!Object.values(UserRoleEnum).includes(value)) {
      throw new UserRoleNotValid(
        `The role <${value}> is not valid. Valid roles are: ${Object.values(UserRoleEnum).join(', ')}`
      );
    }
  }

  isAdmin(): boolean {
    return this.value === UserRoleEnum.ADMIN;
  }

  isViewer(): boolean {
    return this.value === UserRoleEnum.VIEWER;
  }

  static admin(): UserRole {
    return new UserRole(UserRoleEnum.ADMIN);
  }

  static viewer(): UserRole {
    return new UserRole(UserRoleEnum.VIEWER);
  }
}
