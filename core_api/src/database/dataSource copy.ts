import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { Role } from '../modules/role/role.entity';

dotenv.config();

let dataSource: DataSource;
const entities = [Role];

const { NODE_ENV } = process.env;

if (NODE_ENV === 'test') {
  dataSource = new DataSource({
    type: 'sqlite',
    database: ':memory:',
    entities,
    synchronize: true
  });
} else {
  dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: 'postgres',
    password: process.env.POSTGRES_PASSWORD,
    database: 'postgres',
    entities,
    synchronize: true
  });
}

export default dataSource;
