import 'dotenv/config';
import { get } from 'env-var';

export const envs = {

  PORT: get('PORT').required().asPortNumber(),
  PUBLIC_PATH: get('PUBLIC_PATH').default('public').asString(),

  POSTGRES_HOST: get('POSTGRES_HOST').default('localhost').asString(),
  POSTGRES_USER: get('POSTGRES_USER').default('postgres').asString(),
  POSTGRES_DB: get('POSTGRES_DB').default('cochapreciosdb').asString(),
  POSTGRES_PORT: get('POSTGRES_PORT').default(5432).asPortNumber(),
  POSTGRES_PASSWORD: get('POSTGRES_PASSWORD').default('123456').asString(),

  TYPEORM_SHOW_LOGS: get('TYPEORM_SHOW_LOGS').default('True').asBool(),

  JWT_SECRET: get('JWT_SECRET').default('supersecretjwt').asString(),
  JWT_EXPIRES_IN: get('JWT_EXPIRES_IN').default('1d').asString(),

  NODE_ENV: get('NODE_ENV').default('dev').asString(),

};
