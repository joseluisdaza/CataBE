import { Router } from 'express';
import { StatusRoutes } from './status/statusRoutes';
import { UserRoutes } from './users/userRoutes';
import { OwnerRoutes } from './owners/ownerRoutes';

export class AppRoutes {

  static get routes(): Router {

    const router = Router();

    router.use('/api/status', StatusRoutes.routes);
    router.use('/api/users', UserRoutes.routes);
    router.use('/api/owners', OwnerRoutes.routes);

    return router;

  }

}
