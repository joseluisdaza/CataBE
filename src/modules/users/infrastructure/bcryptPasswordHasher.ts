import bcrypt from 'bcrypt';
import { UserPasswordHasher } from '../domain/userPasswordHasher';

export default class BcryptPasswordHasher implements UserPasswordHasher {
  private readonly saltRounds: number = 10;

  async hash(plainPassword: string): Promise<string> {
    return await bcrypt.hash(plainPassword, this.saltRounds);
  }

  async compare(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}
