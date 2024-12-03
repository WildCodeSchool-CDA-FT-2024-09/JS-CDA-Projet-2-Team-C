import dataSource from './dataSource';

(async () => {
  await dataSource.initialize();
  console.info('Data source initialized');

  const queryRunner = dataSource.createQueryRunner();

  try {
    // START TRANSACTION
    await queryRunner.startTransaction();
    // TRUNCATE TABLES / RESET INDEXES
    await queryRunner.query(
      'TRUNCATE consultation_subject RESTART IDENTITY CASCADE'
    );
    await queryRunner.query('TRUNCATE role RESTART IDENTITY CASCADE');
    await queryRunner.query('TRUNCATE gender RESTART IDENTITY CASCADE');
    await queryRunner.query('TRUNCATE department RESTART IDENTITY CASCADE');
    await queryRunner.query('TRUNCATE working_hours RESTART IDENTITY CASCADE');
    await queryRunner.query('TRUNCATE attachment RESTART IDENTITY CASCADE');
    await queryRunner.query('TRUNCATE consultation RESTART IDENTITY CASCADE');
    await queryRunner.query('TRUNCATE patient RESTART IDENTITY CASCADE');
    await queryRunner.query('TRUNCATE "user" RESTART IDENTITY CASCADE');

    // SEED TABLES
    // 1. UNIQUE LABELS
    // Roles
    const roles = ['Admin', 'Doctor', 'Agent', 'Secretary'];
    await queryRunner.manager.query(
      `INSERT INTO "role" (label) VALUES ('${roles.join("'), ('")}')`
    );

    // Genders
    const genders = ['Male', 'Female', 'NA'];
    await queryRunner.manager.query(
      `INSERT INTO "gender" (label) VALUES ('${genders.join("'), ('")}')`
    );

    // Departments
    const departments = [
      'Cardiology',
      'Dermatology',
      'Endocrinology',
      'Gastroenterology',
      'Hematology',
      'Infectious diseases',
      'Nephrology',
      'Neurology',
      'Oncology',
      'Pulmonology',
      'Rheumatology',
      'Urology'
    ];
    await queryRunner.manager.query(
      `INSERT INTO "department" (label) VALUES ('${departments.join("'), ('")}')`
    );

    // Consultation subjects
    const consultationSubjects = [
      'General consultation',
      'Follow-up consultation',
      'Emergency consultation',
      'Preoperative consultation',
      'Postoperative consultation',
      'Routine check-up'
    ];
    await queryRunner.manager.query(
      `INSERT INTO "consultation_subject" (label) VALUES ('${consultationSubjects.join("'), ('")}')`
    );

    // Make utility maps of unique labels to their ids
    type UniqueLabel = {
      id: number;
      label: string;
    };

    type LabelIdMap = {
      [key: string]: number;
    };

    async function makeLabelIdMap(table: string): Promise<LabelIdMap> {
      const result: UniqueLabel[] = await queryRunner.manager.query(
        `SELECT id, label FROM ${table}`
      );
      return result.reduce((acc: LabelIdMap, item: UniqueLabel) => {
        acc[item.label.toLowerCase()] = item.id;
        return acc;
      }, {});
    }

    const roleIdMap = await makeLabelIdMap('role');
    const genderIdMap = await makeLabelIdMap('gender');

    // 2. USERS
    // DOCTORS
    await queryRunner.manager.query(
      `INSERT INTO "user" 
      (firstname, lastname, email, password, "roleId", "genderId", "departmentId")
      VALUES
      ('Cyril', 'Convergence', 'test1@test.com', 'fake1234hash', '${roleIdMap.doctor}', '${genderIdMap.male}', ${Math.floor(Math.random() * departments.length) + 1}),
      ('Diana', 'Divergence', 'test2@test.com', 'fake1234hash', '${roleIdMap.doctor}', '${genderIdMap.female}', ${Math.floor(Math.random() * departments.length) + 1})
      `
    );

    // AGENTS
    await queryRunner.manager.query(
      `INSERT INTO "user" 
      (firstname, lastname, email, password, "roleId", "genderId")
      VALUES
      ('Arnold', 'Agent', 'test3@test.com', 'fake1234hash', '${roleIdMap.agent}', '${genderIdMap.na}'),
      ('Anna', 'Agent', 'test4@test.com', 'fake1234hash', '${roleIdMap.agent}', '${genderIdMap.na}')
      `
    );

    // ADMINS
    await queryRunner.manager.query(
      `INSERT INTO "user" 
      (firstname, lastname, email, password, "roleId", "genderId")
      VALUES
      ('Alice', 'Admin', 'test5@test.com', 'fake1234hash', '${roleIdMap.admin}', '${genderIdMap.na}'),
      ('Albert', 'Admin', 'test6@test.com', 'fake1234hash', '${roleIdMap.admin}', '${genderIdMap.na}')
      `
    );

    // SECRETARIES
    await queryRunner.manager.query(
      `INSERT INTO "user" 
      (firstname, lastname, email, password, "roleId", "genderId", "departmentId")
      VALUES
      ('Samuel', 'Secretary', 'test7@test.com', 'fake1234hash', '${roleIdMap.secretary}', '${genderIdMap.na}', ${Math.floor(Math.random() * departments.length) + 1}),
      ('Sally', 'Secretary', 'test8@test.com', 'fake1234hash', '${roleIdMap.secretary}', '${genderIdMap.na}', ${Math.floor(Math.random() * departments.length) + 1})
      `
    );

    // COMMIT TRANSACTION
    await queryRunner.commitTransaction();
  } catch (error) {
    console.error('Seed error: ', error);
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
  }
})();
