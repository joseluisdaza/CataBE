import { Router, Request, Response, NextFunction } from 'express';
import { getContainer } from '../shared/dependency-injection/container';
import { authenticate, requireAdmin } from '../shared/auth';
import PropertyPutController from './propertyPutController';
import PropertyGetController from './propertyGetController';
import PropertiesGetAllController from './propertiesGetAllController';
import PropertyDeleteController from './propertyDeleteController';
import { validateReqSchema } from '../shared/validator';
import PropertyOwnersGetController from './propertyOwnersGetController';
import PropertyOwnersPostController from './propertyOwnersPostController';
import PropertyOwnersDeleteController from './propertyOwnersDeleteController';

export class PropertyRoutes {
  static get routes(): Router {
    const router = Router();

    const container = getContainer();
    const putController = container.get<PropertyPutController>('Controllers.properties.PropertyPutController');
    const getController = container.get<PropertyGetController>('Controllers.properties.PropertyGetController');
    const getAllController = container.get<PropertiesGetAllController>('Controllers.properties.PropertiesGetAllController');
    const deleteController = container.get<PropertyDeleteController>('Controllers.properties.PropertyDeleteController');
    const ownersGetController = container.get<PropertyOwnersGetController>('Controllers.properties.PropertyOwnersGetController');
    const ownersPostController = container.get<PropertyOwnersPostController>('Controllers.properties.PropertyOwnersPostController');
    const ownersDeleteController = container.get<PropertyOwnersDeleteController>('Controllers.properties.PropertyOwnersDeleteController');

    router.put('/:id', authenticate, requireAdmin, putController.reqSchema, validateReqSchema, (req: Request, res: Response, next: NextFunction) => {
      putController.run(req, res, next);
    });

    router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
      getController.run(req, res, next);
    });

    router.get('/', (req: Request, res: Response, next: NextFunction) => {
      getAllController.run(req, res, next);
    });

    router.delete('/:id', authenticate, requireAdmin, (req: Request, res: Response, next: NextFunction) => {
      deleteController.run(req, res, next);
    });

    router.get('/:id/owners', (req: Request, res: Response, next: NextFunction) => {
      ownersGetController.run(req, res, next);
    });

    router.post('/:id/owners', authenticate, requireAdmin, ownersPostController.reqSchema, validateReqSchema, (req: Request, res: Response, next: NextFunction) => {
      ownersPostController.run(req, res, next);
    });

    router.delete('/:id/owners/:ownerId', authenticate, requireAdmin, (req: Request, res: Response, next: NextFunction) => {
      ownersDeleteController.run(req, res, next);
    });

    return router;
  }
}
