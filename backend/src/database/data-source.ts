import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';
// console.log(process.env)
export const dataSourceOptions: DataSourceOptions = {
  type: 'mssql',
  // driver:'mssql',
  host: process.env.DB_HOST,
  port: +(process.env.PORT || 1433),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/database/entities/*.js'],
  migrations: ['dist/database/migrations/*.js'],
  synchronize: false,
  extra: {
    trustServerCertificate: true,
  },
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
