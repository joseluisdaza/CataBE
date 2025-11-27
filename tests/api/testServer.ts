import { AppRoutes } from '../../src/api/routes';
import { envs } from '../../src/modules/shared/infrastructure/persistence/env/envs';
import { Server } from '../../src/api/server';
import { initializeContainer } from '../../src/api/shared/dependency-injection/container';

let _testServer: Server;

export const getTestServer = async (): Promise<Server> => {
  if (!_testServer) {
    await initializeContainer();
    _testServer = new Server({
      port: envs.PORT,
      routes: AppRoutes.routes,
    });
  }
  return _testServer;
};
