import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import PropertyDeleter from '../../modules/properties/application/propertyDeleter';
import { Controller } from '../shared/controller';

export default class PropertyDeleteController implements Controller {
  constructor(private readonly deleter: PropertyDeleter) {}

  async run(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await this.deleter.run(id);
      res.status(httpStatus.NO_CONTENT).send();
    } catch (error) {
      next(error);
    }
  }

  get reqSchema() { return []; }
}
