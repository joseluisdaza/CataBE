import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import { envs } from '../../modules/shared/infrastructure/persistence/env/envs';
import { getContainer } from './dependency-injection/container';
import { UserRepository } from '../../modules/users/domain/userRepository';
import { UserId } from '../../modules/users/domain/userId';

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : null;

  if (!token) {
    res.status(httpStatus.UNAUTHORIZED).json({ message: 'Missing Authorization token' });
    return;
  }

  try {
    const payload = jwt.verify(token, envs.JWT_SECRET as jwt.Secret) as { sub: string };
    const container = getContainer();
    const repository = container.get<UserRepository>('Users.domain.UserRepository');
    repository.findById(new UserId(payload.sub)).then(user => {
      if (!user) {
        res.status(httpStatus.UNAUTHORIZED).json({ message: 'Invalid token user' });
        return;
      }
      (req as any).user = user;
      next();
    }).catch(() => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Auth lookup failed' });
    });
  } catch {
    res.status(httpStatus.UNAUTHORIZED).json({ message: 'Invalid token' });
  }
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const user = (req as any).user;
  if (!user) {
    res.status(httpStatus.UNAUTHORIZED).json({ message: 'Unauthorized' });
    return;
  }
  if (user.role.value !== 'admin') {
    res.status(httpStatus.FORBIDDEN).json({ message: 'Forbidden: admin required' });
    return;
  }
  next();
}

