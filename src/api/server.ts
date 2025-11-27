import express, { Router } from 'express';
import { errorHandler } from './shared/errorHandler';
import path from 'path';

interface Options {
  port: number;
  routes: Router;
  publicPath?: string;
}

export class Server {

  public readonly app = express();
  private serverListener?: any;
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port, routes, publicPath = 'public' } = options;
    this.port = port;
    this.publicPath = publicPath;
    this.routes = routes;
  }

  async start(callback?: (error?: Error) => void) {

    //* Middlewares
    this.app.use(express.json()); // raw
    this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded

    //* Public Folder
    this.app.use(express.static(this.publicPath));

    //* Routes

    this.app.use(this.routes);

    //* Error handler global
    this.app.use(errorHandler);

    //* SPA /^\/(?!api).*/  <== Only if it does not begin with the world api
    this.app.get(/^\/(?!api).*/, (req, res) => {
      const indexPath = path.join(__dirname, `../../${ this.publicPath }/index.html`);
      res.sendFile(indexPath);
    });

    this.serverListener = this.app.listen(this.port, callback);

  }

  public close() {
    this.serverListener?.close();
  }

}
