import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import PropertyOwnersAdder from '../../modules/propertiesOwners/application/propertyOwnersAdder';
import { Controller } from '../shared/controller';
import { body, ValidationChain } from 'express-validator';

export default class PropertyOwnersPostController implements Controller {
  constructor(private readonly adder: PropertyOwnersAdder) {}

  async run(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { ownerId } = req.body;
      await this.adder.run(id, ownerId);
      res.status(httpStatus.CREATED).send();
    } catch (error) {
      next(error);
    }
  }

  get reqSchema(): ValidationChain[] {
    return [body('ownerId').isString().trim().notEmpty()];
  }
}

