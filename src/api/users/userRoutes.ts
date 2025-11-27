import { Request, Response, Router, NextFunction } from 'express';
import UserPutController from './userPutController';
import UserGetController from './userGetController';
import UserPostAuthController from './userPostAuthController';
import { validateReqSchema } from '../shared/validator';
import { getContainer } from '../shared/dependency-injection/container';

export class UserRoutes {

  static get routes(): Router {

    const router = Router();

    const container = getContainer();
    const userPutController = container.get<UserPutController>('Controllers.users.UserPutController');
    const userGetController = container.get<UserGetController>('Controllers.users.UserGetController');
    const userPostAuthController = container.get<UserPostAuthController>('Controllers.users.UserPostAuthController');

    router.put('/:id', userPutController.reqSchema, validateReqSchema, (req: Request, res: Response, next: NextFunction) => {
      userPutController.run(req, res, next);
    });

    router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
      userGetController.run(req, res, next);
    });

    router.post('/auth', userPostAuthController.reqSchema, validateReqSchema, (req: Request, res: Response, next: NextFunction) => {
      userPostAuthController.run(req, res, next);
    });

    return router;

  }

}
