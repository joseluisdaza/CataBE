import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import OwnerDeleter from '../../modules/owners/application/ownerDeleter';
import { Controller } from '../shared/controller';

export default class OwnerDeleteController implements Controller {
  constructor(private readonly ownerDeleter: OwnerDeleter) {}

  async run(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await this.ownerDeleter.run(id);
      res.status(httpStatus.NO_CONTENT).send();
    } catch (error) {
      next(error);
    }
  }

  get reqSchema() {
    return [];
  }
}
