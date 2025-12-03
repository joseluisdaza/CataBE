import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import OwnerFinder from '../../modules/owners/application/ownerFinder';
import { Controller } from '../shared/controller';

export default class OwnerGetController implements Controller {
  constructor(private readonly ownerFinder: OwnerFinder) {}

  async run(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id;
      const owner = await this.ownerFinder.run(id);

      if (!owner) {
        res.status(httpStatus.NOT_FOUND).send({ message: 'Owner not found' });
        return;
      }

      res.status(httpStatus.OK).json({
        id: owner.id.value,
        name: owner.name.value,
        ciNit: owner.ciNit.value,
        phone: owner.phone.value,
        createdAt: owner.createdAt,
        updatedAt: owner.updatedAt,
      });
    } catch (error) {
      next(error);
    }
  }

  get reqSchema() {
    return [];
  }
}
