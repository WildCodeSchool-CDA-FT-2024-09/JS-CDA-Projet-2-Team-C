import dataSource from './dataSource';

(async () => {
  await dataSource.initialize();
  console.info('Data source initialized');

  const queryRunner = dataSource.createQueryRunner();

  try {
    await queryRunner.startTransaction();
    // Truncate tables here
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

    // Seed tables here
    // Roles
    await queryRunner.manager.query(
      `INSERT INTO "role" (label) VALUES ('Admin'), ('Doctor'), ('Agent'), ('Secretary')`
    );

    // Genders
    await queryRunner.manager.query(
      `INSERT INTO "gender" (label) VALUES ('Male'), ('Female'), ('N/A')`
    );

    // Departments
    await queryRunner.manager.query(
      `INSERT INTO "department" (label) VALUES ('Cardiology'), ('Dermatology'), ('Endocrinology'), ('Gastroenterology'), ('Hematology'), ('Infectious diseases'), ('Nephrology'), ('Neurology'), ('Oncology'), ('Pulmonology'), ('Rheumatology'), ('Urology')`
    );

    // Consultation subjects
    await queryRunner.manager.query(
      `INSERT INTO "consultation_subject" (label) VALUES ('General consultation'), ('Follow-up consultation'), ('Emergency consultation'), ('Preoperative consultation'), ('Postoperative consultation'), ('Routine check-up')`
    );

    // Doctors
    const doctorRoleResult = await queryRunner.manager.query(
      `SELECT id FROM "role" WHERE label = 'Doctor'`
    );
    const doctorRoleId = doctorRoleResult[0].id;
    const maleGenderResult = await queryRunner.manager.query(
      `SELECT id FROM "gender" WHERE label = 'Male'`
    );
    const maleGenderId = maleGenderResult[0].id;
    const femaleGenderResult = await queryRunner.manager.query(
      `SELECT id FROM "gender" WHERE label = 'Female'`
    );
    const femaleGenderId = femaleGenderResult[0].id;

    await queryRunner.manager.query(
      `INSERT INTO "user" 
      (firstname, lastname, email, password, "roleId", "genderId", "departmentId")
      VALUES
      ('Cyril', 'Convergence', 'test1@test.com', 'fake1234hash', '${doctorRoleId}', '${maleGenderId}', ${Math.floor(Math.random() * 12) + 1}),
      ('Diana', 'Divergence', 'test2@test.com', 'fake1234hash', '${doctorRoleId}', '${femaleGenderId}', ${Math.floor(Math.random() * 12) + 1})
      `
    );

    // Agents
    const agentRoleResult = await queryRunner.manager.query(
      `SELECT id FROM "role" WHERE label = 'Agent'`
    );
    const agentRoleId = agentRoleResult[0].id;
    const notApplicableGenderResult = await queryRunner.manager.query(
      `SELECT	id FROM "gender" WHERE label = 'N/A'`
    );
    const notApplicableGenderId = notApplicableGenderResult[0].id;

    await queryRunner.manager.query(
      `INSERT INTO "user" 
      (firstname, lastname, email, password, "roleId", "genderId")
      VALUES
      ('Arnold', 'Agent', 'test3@test.com', 'fake1234hash', '${agentRoleId}', '${notApplicableGenderId}'),
      ('Anna', 'Agent', 'test4@test.com', 'fake1234hash', '${agentRoleId}', '${notApplicableGenderId}')
      `
    );

    // Admins
    const adminRoleResult = await queryRunner.manager.query(
      `SELECT id FROM "role" WHERE label = 'Admin'`
    );
    const adminRoleId = adminRoleResult[0].id;

    await queryRunner.manager.query(
      `INSERT INTO "user" 
      (firstname, lastname, email, password, "roleId", "genderId")
      VALUES
      ('Alice', 'Admin', 'test5@test.com', 'fake1234hash', '${adminRoleId}', '${notApplicableGenderId}'),
      ('Albert', 'Admin', 'test6@test.com', 'fake1234hash', '${adminRoleId}', '${notApplicableGenderId}')
      `
    );

    // Secretaries
    const secretaryRoleResult = await queryRunner.manager.query(
      `SELECT id FROM "role" WHERE label = 'Secretary'`
    );
    const secretaryRoleId = secretaryRoleResult[0].id;

    await queryRunner.manager.query(
      `INSERT INTO "user" 
      (firstname, lastname, email, password, "roleId", "genderId", "departmentId")
      VALUES
      ('Samuel', 'Secretary', 'test7@test.com', 'fake1234hash', '${secretaryRoleId}', '${notApplicableGenderId}', ${Math.floor(Math.random() * 12) + 1}),
      ('Sally', 'Secretary', 'test8@test.com', 'fake1234hash', '${secretaryRoleId}', '${notApplicableGenderId}', ${Math.floor(Math.random() * 12) + 1})
      `
    );

    await queryRunner.commitTransaction();
  } catch (error) {
    console.error('Seed error: ', error);
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
  }
})();
