import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import OwnersFinder from '../../modules/owners/application/ownersFinder';
import { Controller } from '../shared/controller';

export default class OwnerGetAllController implements Controller {
  constructor(private readonly ownersFinder: OwnersFinder) {}

  async run(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const owners = await this.ownersFinder.run();
      res.status(httpStatus.OK).json(
        owners.map(owner => ({
          id: owner.id.value,
          name: owner.name.value,
          ciNit: owner.ciNit.value,
          phone: owner.phone.value,
          createdAt: owner.createdAt,
          updatedAt: owner.updatedAt,
        }))
      );
    } catch (error) {
      next(error);
    }
  }

  get reqSchema() {
    return [];
  }
}
