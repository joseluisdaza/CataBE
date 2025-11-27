import { envs } from '../env/envs';
import { TypeOrmConfig } from '../typeorm/typeOrmConfig';

export default class TypeOrmConfigFactory {
  static createConfig(): TypeOrmConfig {
    return {
      host: envs.POSTGRES_HOST,
      port: envs.POSTGRES_PORT,
      username: envs.POSTGRES_USER,
      password: envs.POSTGRES_PASSWORD,
      database: envs.POSTGRES_DB,
      showLogs: envs.TYPEORM_SHOW_LOGS,
    };
  }
}
