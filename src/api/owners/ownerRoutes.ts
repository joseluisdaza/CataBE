import { Request, Response, Router, NextFunction } from 'express';
import OwnerPutController from './ownerPutController';
import OwnerGetController from './ownerGetController';
import OwnerDeleteController from './ownerDeleteController';
import { validateReqSchema } from '../shared/validator';
import { getContainer } from '../shared/dependency-injection/container';
import { authenticate, requireAdmin } from '../shared/auth';

export class OwnerRoutes {

  static get routes(): Router {

    const router = Router();

    const container = getContainer();
    const ownerPutController = container.get<OwnerPutController>('Controllers.owners.OwnerPutController');
    const ownerGetController = container.get<OwnerGetController>('Controllers.owners.OwnerGetController');
    const ownerGetAllController = container.get<any>('Controllers.owners.OwnerGetAllController');
    const ownerDeleteController = container.get<OwnerDeleteController>('Controllers.owners.OwnerDeleteController');

    router.put('/:id', authenticate, requireAdmin, ownerPutController.reqSchema, validateReqSchema, (req: Request, res: Response, next: NextFunction) => {
      ownerPutController.run(req, res, next);
    });

    router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
      ownerGetController.run(req, res, next);
    });

    router.get('/', (req: Request, res: Response, next: NextFunction) => {
      ownerGetAllController.run(req, res, next);
    });

    router.delete('/:id', authenticate, requireAdmin, (req: Request, res: Response, next: NextFunction) => {
      ownerDeleteController.run(req, res, next);
    });

    return router;

  }

}
