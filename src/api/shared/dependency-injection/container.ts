import { DependencyInjectionContainerCreator } from './dependencyInjectionContainerCreator';

const creator = new DependencyInjectionContainerCreator();

export const initializeContainer = async () => {
  await creator.load();
};

export const getContainer = () => creator.container;
