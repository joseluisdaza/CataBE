import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';

import UserFinder from '../../modules/users/application/userFinder';
import { Controller } from '../shared/controller';

export default class UserGetController implements Controller {
  constructor(private readonly userFinder: UserFinder) {}

  async run(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id;
      const user = await this.userFinder.run(id);

      if (!user) {
        res.status(httpStatus.NOT_FOUND).send({ message: 'User not found' });
        return;
      }

      res.status(httpStatus.OK).json({
        id: user.id.value,
        name: user.name.value,
        username: user.username.value,
        email: user.email.value,
        role: user.role.value,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
    } catch (error) {
      next(error);
    }
  }

  get reqSchema() {
    return [];
  }
}
