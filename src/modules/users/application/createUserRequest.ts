import { UserRoleEnum } from '../domain/userRole';

export interface CreateUserRequest {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  role: UserRoleEnum;
}
