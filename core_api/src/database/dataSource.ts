import { DataSource } from 'typeorm';
import { Role } from '../modules/role/role.entity';

export const dataSource = new DataSource({
  type: 'sqlite',
  database: `./setup.db`,
  entities: [Role],
  synchronize: true
});
