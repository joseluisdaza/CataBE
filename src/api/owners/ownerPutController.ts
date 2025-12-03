import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import OwnerRegistrar from '../../modules/owners/application/ownerRegistrar';
import { Controller } from '../shared/controller';
import { body, ValidationChain } from 'express-validator';

export default class OwnerPutController implements Controller {
  constructor(private readonly ownerRegistrar: OwnerRegistrar) {}

  async run(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { name, ciNit, phone } = req.body;

      await this.ownerRegistrar.run({ id, name, ciNit, phone });

      res.status(httpStatus.CREATED).send();
    } catch (error) {
      next(error);
    }
  }

  get reqSchema(): ValidationChain[] {
    return [
      body('name').isString().trim().notEmpty().withMessage('Name is required'),
      body('ciNit').isString().trim().matches(/^\d{5,15}$/).withMessage('CI/NIT must be 5-15 digits'),
      body('phone').isString().trim().matches(/^\d{7,10}$/).withMessage('Phone must be 7-10 digits'),
    ];
  }
}
