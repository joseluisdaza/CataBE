import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';

import UserAuthenticator from '../../modules/users/application/userAuthenticator';
import { UserTokenSigner } from '../../modules/users/domain/userTokenSigner';
import { Controller } from '../shared/controller';
import { body, ValidationChain } from 'express-validator';

export default class UserPostAuthController implements Controller {
  constructor(private readonly userAuthenticator: UserAuthenticator, private readonly tokenSigner: UserTokenSigner) {}

  async run(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email, password } = req.body;

    try {
      const authenticatedUser = await this.userAuthenticator.run({ email, password });
      const token = this.tokenSigner.sign({
        id: authenticatedUser.id,
        email: authenticatedUser.email,
        username: authenticatedUser.username,
        role: authenticatedUser.role,
      });

      res.status(httpStatus.OK).json({
        user: authenticatedUser,
        token,
      });
    } catch (error) {
      res.status(httpStatus.UNAUTHORIZED).json({
        message: error instanceof Error ? error.message : 'Authentication failed',
      });
    }
  }

  get reqSchema(): ValidationChain[] {
    return [
      body('email').isEmail().withMessage('Valid email is required'),
      body('password').isString().notEmpty().withMessage('Password is required'),
    ];
  }
}
