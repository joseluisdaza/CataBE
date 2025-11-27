import { ContainerBuilder, YamlFileLoader } from 'node-dependency-injection';
import { envs } from '../../../modules/shared/infrastructure/persistence/env/envs';

export class DependencyInjectionContainerCreator {
  private _container: ContainerBuilder;

  constructor() {
    this._container = new ContainerBuilder();
  }

  async load(): Promise<void> {
    const loader = new YamlFileLoader(this._container);
    const env = envs.NODE_ENV ?? 'dev';

    await loader.load(`${__dirname}/application_${env}.yaml`);
  }

  get container(): ContainerBuilder {
    return this._container;
  }
}
