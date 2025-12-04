import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import PropertyFinder from '../../modules/properties/application/propertyFinder';
import { Controller } from '../shared/controller';

export default class PropertyGetController implements Controller {
  constructor(private readonly finder: PropertyFinder) {}

  async run(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const p = await this.finder.run(id);
      if (!p) {
        res.status(httpStatus.NOT_FOUND).send({ message: 'Property not found' });
        return;
      }

      res.status(httpStatus.OK).json({
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
      });
    } catch (error) {
      next(error);
    }
  }

  get reqSchema() { return []; }
}
