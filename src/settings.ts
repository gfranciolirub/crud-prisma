function getEnvOrThrow(envName: string): string {
  const env = process.env[envName];
  if (!env) `Missing environment variable ${envName}`;
  return env;
}

export const APP_PORT = getEnvOrThrow('APP_PORT');
export const TYPEORM_HOST = getEnvOrThrow('TYPEORM_HOST');
export const TYPEORM_PORT = getEnvOrThrow('TYPEORM_PORT');
export const TYPEORM_USERNAME = getEnvOrThrow('TYPEORM_USERNAME');
export const TYPEORM_PASSWORD = getEnvOrThrow('TYPEORM_PASSWORD');
export const TYPEORM_DATABASE = getEnvOrThrow('TYPEORM_DATABASE');
export const VIACEP_URL = getEnvOrThrow('VIACEP_URL');
