import { Router, Request, Response, NextFunction } from 'express';
import { getContainer } from '../shared/dependency-injection/container';
import { authenticate, requireAdmin } from '../shared/auth';
import PropertyPutController from './propertyPutController';
import PropertyGetController from './propertyGetController';
import PropertiesGetAllController from './propertiesGetAllController';
import PropertyDeleteController from './propertyDeleteController';
import { validateReqSchema } from '../shared/validator';

export class PropertyRoutes {
  static get routes(): Router {
    const router = Router();

    const container = getContainer();
    const putController = container.get<PropertyPutController>('Controllers.properties.PropertyPutController');
    const getController = container.get<PropertyGetController>('Controllers.properties.PropertyGetController');
    const getAllController = container.get<PropertiesGetAllController>('Controllers.properties.PropertiesGetAllController');
    const deleteController = container.get<PropertyDeleteController>('Controllers.properties.PropertyDeleteController');

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

    return router;
  }
}
