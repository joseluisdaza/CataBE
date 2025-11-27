import { UserRole, UserRoleEnum } from '../../../../src/modules/users/domain/userRole';

export class UserRoleMother {
  static create(value: UserRoleEnum): UserRole {
    return new UserRole(value);
  }

  static random(): UserRole {
    const roles = Object.values(UserRoleEnum);
    const randomRole = roles[Math.floor(Math.random() * roles.length)];
    return this.create(randomRole);
  }

  static admin(): UserRole {
    return this.create(UserRoleEnum.ADMIN);
  }

  static viewer(): UserRole {
    return this.create(UserRoleEnum.VIEWER);
  }

  static invalidRole(): string {
    return 'super-admin'; // Not a valid role
  }
}
