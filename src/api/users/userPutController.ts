import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';

import UserRegistrar from '../../modules/users/application/userRegistrar';
import { Controller } from '../shared/controller';
import { body, ValidationChain } from 'express-validator';
import { UserRoleEnum } from '../../modules/users/domain/userRole';

export default class UserPutController implements Controller {
  constructor(private readonly userRegistrar: UserRegistrar) {}

  async run(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { name, username, email, password, role } = req.body;

      await this.userRegistrar.run({
        id,
        name,
        username,
        email,
        password,
        role,
      });

      res.status(httpStatus.CREATED).send();
    } catch (error) {
      next(error);
    }
  }

  get reqSchema(): ValidationChain[] {
    return [
      body('name').isString().trim().notEmpty().withMessage('Name is required'),
      body('username').isString().trim().notEmpty().withMessage('Username is required'),
      body('email').isEmail().withMessage('Valid email is required'),
      body('password')
        .isString()
        .trim()
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters'),
      body('role')
        .trim()
        .notEmpty()
        .withMessage('Role is required')
        .isIn(Object.values(UserRoleEnum))
        .withMessage(`Role must be one of: ${Object.values(UserRoleEnum).join(', ')}`),
    ];
  }
}
