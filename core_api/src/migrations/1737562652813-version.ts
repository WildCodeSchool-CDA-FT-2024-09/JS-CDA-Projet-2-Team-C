import { MigrationInterface, QueryRunner } from 'typeorm';

export class Version1737562652813 implements MigrationInterface {
  name = 'Version1737562652813';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "attachment" ("id" SERIAL NOT NULL, "note" text NOT NULL, "filePath" character varying(150), "fileDisplayName" character varying(100), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "authorId" uuid, "consultationId" uuid, CONSTRAINT "PK_d2a80c3a8d467f08a750ac4b420" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "consultation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying(255) NOT NULL, "consultationDate" date NOT NULL, "startTime" TIME NOT NULL, "durationMinutes" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "subjectId" integer, "authorId" uuid, "doctorId" uuid, "patientId" uuid, CONSTRAINT "PK_5203569fac28a4a626c42abe70b" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "consultation_subject" ("id" SERIAL NOT NULL, "label" character varying(60) NOT NULL, CONSTRAINT "UQ_dea6273b5a9924ad9cefc9bffdb" UNIQUE ("label"), CONSTRAINT "PK_dd690a3bd40554e0f8e5bb24569" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "department" ("id" SERIAL NOT NULL, "label" character varying(50) NOT NULL, CONSTRAINT "UQ_707f133e134adc22e892c9930b6" UNIQUE ("label"), CONSTRAINT "PK_9a2213262c1593bffb581e382f5" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "gender" ("id" SERIAL NOT NULL, "label" character varying(30) NOT NULL, CONSTRAINT "UQ_66015ba2001e03abeac81033cf3" UNIQUE ("label"), CONSTRAINT "PK_98a711129bc073e6312d08364e8" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "patient" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstname" character varying(50) NOT NULL, "lastname" character varying(50) NOT NULL, "email" character varying(100) NOT NULL, "ssn" character varying(50) NOT NULL, "town" character varying(100) NOT NULL, "postcode" character varying(16) NOT NULL, "dateOfBirth" date NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "genderId" integer, CONSTRAINT "UQ_6849b8aa603f62d91ca679001b9" UNIQUE ("ssn"), CONSTRAINT "PK_8dfa510bb29ad31ab2139fbfb99" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "role" ("id" SERIAL NOT NULL, "code" character varying(30) NOT NULL, "label" character varying(30) NOT NULL, CONSTRAINT "UQ_ee999bb389d7ac0fd967172c41f" UNIQUE ("code"), CONSTRAINT "UQ_6194356fbe60fc21663ecfdf86b" UNIQUE ("label"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstname" character varying(50) NOT NULL, "lastname" character varying(50) NOT NULL, "email" character varying(100) NOT NULL, "password" character varying(255) NOT NULL, "isArchived" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "roleId" integer, "departmentId" integer, "genderId" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "working_hours" ("id" SERIAL NOT NULL, "weekday" integer NOT NULL, "startTime" TIME NOT NULL, "endTime" TIME NOT NULL, "doctorId" uuid, CONSTRAINT "PK_5f84d2fa3953367fe9d704d8df6" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "attachment" ADD CONSTRAINT "FK_c8cacbfb04fdb38644032d02aa5" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "attachment" ADD CONSTRAINT "FK_7900b921979363ba0b6f84c8df1" FOREIGN KEY ("consultationId") REFERENCES "consultation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "consultation" ADD CONSTRAINT "FK_fe6f4cd594d0df654e336b569f5" FOREIGN KEY ("subjectId") REFERENCES "consultation_subject"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "consultation" ADD CONSTRAINT "FK_b1a2e4cfa3997e2c3eba77f8df6" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "consultation" ADD CONSTRAINT "FK_ebbc9b3aa894ef6713ac2767aca" FOREIGN KEY ("doctorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "consultation" ADD CONSTRAINT "FK_a410e13ba9228bf180f06a9fbaf" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "patient" ADD CONSTRAINT "FK_82d41571847a7306d6dbe518407" FOREIGN KEY ("genderId") REFERENCES "gender"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_3d6915a33798152a079997cad28" FOREIGN KEY ("departmentId") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_6273b1aa12d5d17f8e1284200be" FOREIGN KEY ("genderId") REFERENCES "gender"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "working_hours" ADD CONSTRAINT "FK_68bf9d1d130dbd11763e4d4b26e" FOREIGN KEY ("doctorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "working_hours" DROP CONSTRAINT "FK_68bf9d1d130dbd11763e4d4b26e"`
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_6273b1aa12d5d17f8e1284200be"`
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_3d6915a33798152a079997cad28"`
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`
    );
    await queryRunner.query(
      `ALTER TABLE "patient" DROP CONSTRAINT "FK_82d41571847a7306d6dbe518407"`
    );
    await queryRunner.query(
      `ALTER TABLE "consultation" DROP CONSTRAINT "FK_a410e13ba9228bf180f06a9fbaf"`
    );
    await queryRunner.query(
      `ALTER TABLE "consultation" DROP CONSTRAINT "FK_ebbc9b3aa894ef6713ac2767aca"`
    );
    await queryRunner.query(
      `ALTER TABLE "consultation" DROP CONSTRAINT "FK_b1a2e4cfa3997e2c3eba77f8df6"`
    );
    await queryRunner.query(
      `ALTER TABLE "consultation" DROP CONSTRAINT "FK_fe6f4cd594d0df654e336b569f5"`
    );
    await queryRunner.query(
      `ALTER TABLE "attachment" DROP CONSTRAINT "FK_7900b921979363ba0b6f84c8df1"`
    );
    await queryRunner.query(
      `ALTER TABLE "attachment" DROP CONSTRAINT "FK_c8cacbfb04fdb38644032d02aa5"`
    );
    await queryRunner.query(`DROP TABLE "working_hours"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "role"`);
    await queryRunner.query(`DROP TABLE "patient"`);
    await queryRunner.query(`DROP TABLE "gender"`);
    await queryRunner.query(`DROP TABLE "department"`);
    await queryRunner.query(`DROP TABLE "consultation_subject"`);
    await queryRunner.query(`DROP TABLE "consultation"`);
    await queryRunner.query(`DROP TABLE "attachment"`);
  }
}
