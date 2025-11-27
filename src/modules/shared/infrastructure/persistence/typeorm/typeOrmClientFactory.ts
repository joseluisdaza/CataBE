import { Connection, createConnection, getConnection } from 'typeorm';
import { TypeOrmConfig } from './typeOrmConfig';

export default class TypeOrmClientFactory {
  static async createClient(contextName: string, config: TypeOrmConfig): Promise<Connection> {
    try {
      const connection = await createConnection({
        name: contextName,
        type: 'postgres',
        host: config.host,
        port: config.port,
        username: config.username,
        password: config.password,
        database: config.database,
        entities: [`${__dirname}/../../../../*/infrastructure/persistence/typeorm/*Entity{.js,.ts}`],
        synchronize: true,
        logging: config.showLogs,
      });

      return connection;
    } catch(error) {
      console.log('error', error);

      return getConnection(contextName);
    }
  }
}
