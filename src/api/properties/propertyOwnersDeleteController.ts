import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import PropertyOwnersRemover from '../../modules/propertiesOwners/application/propertyOwnersRemover';
import { Controller } from '../shared/controller';

export default class PropertyOwnersDeleteController implements Controller {
  constructor(private readonly remover: PropertyOwnersRemover) {}

  async run(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id, ownerId } = req.params as any;
      await this.remover.run(id, ownerId);
      res.status(httpStatus.NO_CONTENT).send();
    } catch (error) {
      next(error);
    }
  }

  get reqSchema() { return []; }
}

