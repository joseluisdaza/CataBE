import { AggregateRoot } from '../../shared/domain/aggregateRoot';
import { UserId } from './userId';
import { UserName } from './userName';
import { UserUsername } from './userUsername';
import { UserEmail } from './userEmail';
import { UserPassword } from './userPassword';
import { UserRole } from './userRole';

export class User extends AggregateRoot {
  readonly id: UserId;
  readonly name: UserName;
  readonly username: UserUsername;
  readonly email: UserEmail;
  readonly password: UserPassword;
  readonly role: UserRole;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;

  constructor(
    id: UserId,
    name: UserName,
    username: UserUsername,
    email: UserEmail,
    password: UserPassword,
    role: UserRole,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super();
    this.id = id;
    this.name = name;
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = role;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromPrimitives(plainData: {
    id: string;
    name: string;
    username: string;
    email: string;
    password: string;
    role: string;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    return new User(
      new UserId(plainData.id),
      new UserName(plainData.name),
      new UserUsername(plainData.username),
      new UserEmail(plainData.email),
      UserPassword.fromHash(plainData.password),
      new UserRole(plainData.role as any),
      plainData.createdAt,
      plainData.updatedAt
    );
  }

  toPrimitives(): any {
    return {
      id: this.id.value,
      name: this.name.value,
      username: this.username.value,
      email: this.email.value,
      password: this.password.value,
      role: this.role.value,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
