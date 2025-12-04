import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import OwnerPropertiesFinder from '../../modules/propertiesOwners/application/ownerPropertiesFinder';
import { Controller } from '../shared/controller';

export default class OwnerPropertiesGetController implements Controller {
  constructor(private readonly finder: OwnerPropertiesFinder) {}

  async run(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const props = await this.finder.run(id);
      res.status(httpStatus.OK).json(
        props.map(p => ({
          id: p.id.value,
          unitNumber: p.unitNumber.value,
          cadastralCode: p.cadastralCode.value,
          municipality: p.municipality.value,
          propertyClass: p.propertyClass.value,
          area: p.area.value,
          taxZone: p.taxZone.value,
          propertyType: p.propertyType.value,
          location: p.location.value,
          createdAt: p.createdAt,
          updatedAt: p.updatedAt,
        }))
      );
    } catch (error) {
      next(error);
    }
  }

  get reqSchema() { return []; }
}

