import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import PropertyOwnersFinder from '../../modules/propertiesOwners/application/propertyOwnersFinder';
import { Controller } from '../shared/controller';

export default class PropertyOwnersGetController implements Controller {
  constructor(private readonly finder: PropertyOwnersFinder) {}

  async run(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const owners = await this.finder.run(id);
      res.status(httpStatus.OK).json(
        owners.map(o => ({
          id: o.id.value,
          name: o.name.value,
          ciNit: o.ciNit.value,
          phone: o.phone.value,
          createdAt: o.createdAt,
          updatedAt: o.updatedAt,
        }))
      );
    } catch (error) {
      next(error);
    }
  }

  get reqSchema() { return []; }
}

