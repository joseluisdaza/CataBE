import { CreateUserRequest } from '../../../../src/modules/users/application/createUserRequest';
import { UserId } from '../../../../src/modules/users/domain/userId';
import { UserName } from '../../../../src/modules/users/domain/userName';
import { UserUsername } from '../../../../src/modules/users/domain/userUsername';
import { UserEmail } from '../../../../src/modules/users/domain/userEmail';
import { UserPassword } from '../../../../src/modules/users/domain/userPassword';
import { UserRole, UserRoleEnum } from '../../../../src/modules/users/domain/userRole';
import { UserIdMother } from '../domain/userIdMother';
import { UserNameMother } from '../domain/userNameMother';
import { UserUsernameMother } from '../domain/userUsernameMother';
import { UserEmailMother } from '../domain/userEmailMother';
import { UserPasswordMother } from '../domain/userPasswordMother';
import { UserRoleMother } from '../domain/userRoleMother';

export class CreateUserRequestMother {
  static create(
    id: UserId,
    name: UserName,
    username: UserUsername,
    email: UserEmail,
    password: UserPassword,
    role: UserRole,
  ): CreateUserRequest {
    return {
      id: id.value,
      name: name.value,
      username: username.value,
      email: email.value,
      password: password.value,
      role: role.value,
    };
  }

  static random(): CreateUserRequest {
    return this.create(
      UserIdMother.random(),
      UserNameMother.random(),
      UserUsernameMother.random(),
      UserEmailMother.random(),
      UserPasswordMother.random(),
      UserRoleMother.random(),
    );
  }

  static invalidName(): CreateUserRequest {
    return {
      id: UserIdMother.random().value,
      name: UserNameMother.invalidName(),
      username: UserUsernameMother.random().value,
      email: UserEmailMother.random().value,
      password: UserPasswordMother.random().value,
      role: UserRoleMother.random().value,
    };
  }

  static invalidEmail(): CreateUserRequest {
    return {
      id: UserIdMother.random().value,
      name: UserNameMother.random().value,
      username: UserUsernameMother.random().value,
      email: UserEmailMother.invalidEmail(),
      password: UserPasswordMother.random().value,
      role: UserRoleMother.random().value,
    };
  }

  static invalidPassword(): CreateUserRequest {
    return {
      id: UserIdMother.random().value,
      name: UserNameMother.random().value,
      username: UserUsernameMother.random().value,
      email: UserEmailMother.random().value,
      password: UserPasswordMother.invalidPassword(),
      role: UserRoleMother.random().value,
    };
  }

  static invalidRole(): CreateUserRequest {
    return {
      id: UserIdMother.random().value,
      name: UserNameMother.random().value,
      username: UserUsernameMother.random().value,
      email: UserEmailMother.random().value,
      password: UserPasswordMother.random().value,
      role: UserRoleMother.invalidRole() as any,
    };
  }

  static invalidUsername(): CreateUserRequest {
    return {
      id: UserIdMother.random().value,
      name: UserNameMother.random().value,
      username: UserUsernameMother.invalidUsername(),
      email: UserEmailMother.random().value,
      password: UserPasswordMother.random().value,
      role: UserRoleMother.random().value,
    };
  }
}
