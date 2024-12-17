import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import {
  Attachment,
  Consultation,
  ConsultationSubject,
  Department,
  Gender,
  Patient,
  Role,
  User,
  WorkingHours,
  DisplayText
} from '../modules/entities.index';

dotenv.config();
const { NODE_ENV } = process.env;

let dataSource: DataSource;
const entities = [
  User,
  Role,
  Department,
  Gender,
  WorkingHours,
  Consultation,
  ConsultationSubject,
  Attachment,
  Patient,
  DisplayText
];

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
