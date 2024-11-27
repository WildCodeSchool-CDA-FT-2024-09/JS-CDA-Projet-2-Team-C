import { DataSource } from 'typeorm';
import { Role } from '../modules/role/role.entity';

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: 'postgres',
  password: process.env.POSTGRES_PASSWORD,
  database: 'postgres',
  entities: [Role],
  synchronize: true
});
