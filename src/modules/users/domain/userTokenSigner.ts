export interface UserTokenSigner {
  sign(payload: { id: string; email: string; username: string; role: string }): string;
  verify<T = any>(token: string): T;
}
