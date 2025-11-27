import { Router } from 'express';
import { getContainer } from '../shared/dependency-injection/container';
import StatusGetController from './statusGetController';

export class StatusRoutes {

  static get routes(): Router {

    const router = Router();
    const container = getContainer();
    const statusGetController = container.get<StatusGetController>('Controllers.status.StatusGetController');

    router.get('/', statusGetController.run);

    return router;

  }

}
