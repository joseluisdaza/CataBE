import { UserPasswordHasher } from '../../../../src/modules/users/domain/userPasswordHasher';

export class UserPasswordHasherMock implements UserPasswordHasher {
  private readonly mockHash = jest.fn();
  private readonly mockCompare = jest.fn();

  async hash(plainPassword: string): Promise<string> {
    return await this.mockHash(plainPassword);
  }

  async compare(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await this.mockCompare(plainPassword, hashedPassword);
  }

  whenHashReturn(hashedPassword: string): void {
    this.mockHash.mockReturnValue(hashedPassword);
  }

  whenCompareReturn(result: boolean): void {
    this.mockCompare.mockReturnValue(result);
  }
}
