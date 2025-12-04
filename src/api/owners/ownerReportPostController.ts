import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import OwnerFinder from '../../modules/owners/application/ownerFinder';
import OwnerPropertiesFinder from '../../modules/propertiesOwners/application/ownerPropertiesFinder';
import { Controller } from '../shared/controller';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs';
import { envs } from '../../modules/shared/infrastructure/persistence/env/envs';

export default class OwnerReportPostController implements Controller {
  constructor(private readonly ownerFinder: OwnerFinder, private readonly propsFinder: OwnerPropertiesFinder) {}

  async run(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const owner = await this.ownerFinder.run(id);
      if (!owner) {
        res.status(httpStatus.NOT_FOUND).json({ message: 'Owner not found' });
        return;
      }

      const props = await this.propsFinder.run(id);

      const title = 'Reporte de Propietario';
      const header = `Nombre: ${owner.name.value}<br/>CI/NIT: ${owner.ciNit.value}<br/>Teléfono: ${owner.phone.value}`;
      const rows = props.map(p => `
        <tr>
          <td>${p.id.value}</td>
          <td>${p.unitNumber.value}</td>
          <td>${p.cadastralCode.value}</td>
          <td>${p.municipality.value}</td>
          <td>${p.propertyClass.value}</td>
          <td>${p.area.value}</td>
          <td>${p.taxZone.value}</td>
          <td>${p.propertyType.value}</td>
          <td>${p.location.value}</td>
        </tr>
      `).join('');

      const html = `
        <html>
          <head>
            <meta charset="utf-8" />
            <title>${title}</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              h1 { margin-bottom: 6px; }
              table { width: 100%; border-collapse: collapse; }
              th, td { border: 1px solid #333; padding: 6px; font-size: 12px; }
              th { background: #eee; }
            </style>
          </head>
          <body>
            <h1>${title}</h1>
            <div>${header}</div>
            <h3>Propiedades</h3>
            <table>
              <thead>
                <tr>
                  <th>ID</th><th>Número</th><th>Catastral</th><th>Municipio</th><th>Clase</th><th>Área</th><th>Zona</th><th>Tipo</th><th>Ubicación</th>
                </tr>
              </thead>
              <tbody>
                ${rows || `<tr><td colspan=9>No tiene propiedades registradas.</td></tr>`}
              </tbody>
            </table>
          </body>
        </html>
      `;

      const publicDir = path.resolve(process.cwd(), envs.PUBLIC_PATH);
      const reportsDir = path.join(publicDir, 'reports');
      await fs.promises.mkdir(reportsDir, { recursive: true });
      const filename = `${uuidv4()}.pdf`;
      const filePath = path.join(reportsDir, filename);

      let browser: any;
      try {
        const { default: puppeteer } = await import('puppeteer');
        browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: 'networkidle0' });
        await page.pdf({ path: filePath, format: 'A4', printBackground: true });
      } catch (e) {
        throw { status: 500, message: 'PDF generator not available. Please install puppeteer.' };
      } finally {
        if (browser) await browser.close();
      }

      const url = `/reports/${filename}`;
      const absoluteUrl = `${req.protocol}://${req.get('host')}${url}`;
      res.status(httpStatus.CREATED).json({ filename, url, absoluteUrl });
    } catch (error) {
      next(error);
    }
  }

  get reqSchema() { return []; }
}
