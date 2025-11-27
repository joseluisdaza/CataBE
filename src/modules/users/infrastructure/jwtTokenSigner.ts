import * as jwt from 'jsonwebtoken';
import { envs } from '../../shared/infrastructure/persistence/env/envs';
import { UserTokenSigner } from '../domain/userTokenSigner';

export default class JwtTokenSigner implements UserTokenSigner {
  sign(user: { id: string; email: string; username: string; role: string }): string {
    const payload = {
      sub: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    };

    const secret: jwt.Secret = envs.JWT_SECRET;
    const options: jwt.SignOptions = {
      expiresIn: envs.JWT_EXPIRES_IN as any,
      algorithm: 'HS256',
    };

    return jwt.sign(payload, secret, options);
  }

  verify<T = any>(token: string): T {
    return jwt.verify(token, envs.JWT_SECRET) as T;
  }
}
