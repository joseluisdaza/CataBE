import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import PropertyUpdater from '../../modules/properties/application/propertyUpdater';
import PropertyCreator from '../../modules/properties/application/propertyCreator';
import PropertyFinder from '../../modules/properties/application/propertyFinder';
import { Controller } from '../shared/controller';
import { body, ValidationChain } from 'express-validator';

export default class PropertyPutController implements Controller {
  constructor(private readonly updater: PropertyUpdater, private readonly creator: PropertyCreator, private readonly finder: PropertyFinder) {}

  async run(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const {
        unitNumber,
        cadastralCode,
        municipality,
        propertyClass,
        area,
        taxZone,
        propertyType,
        location,
      } = req.body;

      const exists = await this.finder.run(id);
      if (exists) {
        await this.updater.run({ id, unitNumber, cadastralCode, municipality, propertyClass, area, taxZone, propertyType, location });
      } else {
        await this.creator.run({ id, unitNumber, cadastralCode, municipality, propertyClass, area, taxZone, propertyType, location });
      }

      res.status(httpStatus.CREATED).send();
    } catch (error) {
      next(error);
    }
  }

  get reqSchema(): ValidationChain[] {
    return [
      body('unitNumber').isString().trim().notEmpty(),
      body('cadastralCode').isString().trim().matches(/^[0-9\-]+$/),
      body('municipality').isString().trim().notEmpty(),
      body('propertyClass').isString().trim().notEmpty(),
      body('area').isString().trim().notEmpty(),
      body('taxZone').isString().trim().notEmpty(),
      body('propertyType').isString().trim().notEmpty(),
      body('location').isString().trim().notEmpty(),
    ];
  }
}
