import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import dbConfig from './src/app/config/db.config';

ConfigModule.forRoot({
  isGlobal: true,
  load: [dbConfig]
});

const config = dbConfig().database;

export default new DataSource({
  type: 'postgres',
  host: config.host,
  port: config.port,
  username: config.username,
  password: config.password,
  database: config.name,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/migrations/**/*{.ts,.js}'],
  migrationsTableName: 'migrations'
});
