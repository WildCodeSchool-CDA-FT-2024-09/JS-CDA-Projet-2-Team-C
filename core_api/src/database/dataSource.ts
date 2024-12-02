import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { Role } from '../modules/role/role.entity';
import { Department } from '../modules/department/department.entity';
import { Gender } from '../modules/gender/gender.entity';
import { User } from '../modules/user/user.entity';
import { WorkingHours } from '../modules/working_hours/workingHours.entity';
import { Attachment } from '../modules/attachment/attachment.entity';
import { Consultation } from '../modules/consultation/consultation.entity';
import { ConsultationSubject } from '../modules/consultation_subject/consultationSubject.entity';
import { Patient } from '../modules/patient/patient.entity';

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
  Patient
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
