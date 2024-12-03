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
    // Fake email utilty
    // Add min one milisecond tick to avoid duplicate emails
    async function fakeEmail(): Promise<string> {
      const time = Date.now();
      await new Promise((resolve) => setTimeout(resolve, 3));
      return `fake${time}@fake.com`;
    }

    // DOCTORS
    const doctors = [
      {
        firstname: 'Cyril',
        lastname: 'Convergence',
        email: await fakeEmail(),
        password: 'fake1234hash',
        roleId: roleIdMap.doctor,
        genderId: genderIdMap.male,
        departmentId: Math.floor(Math.random() * departments.length) + 1
      },
      {
        firstname: 'Diana',
        lastname: 'Divergence',
        email: await fakeEmail(),
        password: 'fake1234hash',
        roleId: roleIdMap.doctor,
        genderId: genderIdMap.female,
        departmentId: Math.floor(Math.random() * departments.length) + 1
      }
    ];

    const doctorValues = doctors
      .map(
        (doctor) =>
          `('${doctor.firstname}', '${doctor.lastname}', '${doctor.email}', '${doctor.password}', ${doctor.roleId}, ${doctor.genderId}, ${doctor.departmentId})`
      )
      .join(', ');

    const doctorResult = await queryRunner.manager.query(`
      INSERT INTO "user"
      (firstname, lastname, email, password, "roleId", "genderId", "departmentId")
      VALUES ${doctorValues}
      RETURNING id
    `);

    const doctorIds = doctorResult.map((item: { id: number }) => item.id);

    // AGENTS
    const agents = [
      {
        firstname: 'Arnold',
        lastname: 'Agent',
        email: await fakeEmail(),
        password: 'fake1234hash',
        roleId: roleIdMap.agent,
        genderId: genderIdMap.na
      },
      {
        firstname: 'Anna',
        lastname: 'Agent',
        email: await fakeEmail(),
        password: 'fake1234hash',
        roleId: roleIdMap.agent,
        genderId: genderIdMap.na
      }
    ];

    const agentValues = agents
      .map(
        (agent) =>
          `('${agent.firstname}', '${agent.lastname}', '${agent.email}', '${agent.password}', ${agent.roleId}, ${agent.genderId})`
      )
      .join(', ');

    await queryRunner.manager.query(`
      INSERT INTO "user"
      (firstname, lastname, email, password, "roleId", "genderId")
      VALUES ${agentValues}
    `);

    // ADMINS
    const admins = [
      {
        firstname: 'Alice',
        lastname: 'Admin',
        email: await fakeEmail(),
        password: 'fake1234hash',
        roleId: roleIdMap.admin,
        genderId: genderIdMap.na
      },
      {
        firstname: 'Albert',
        lastname: 'Admin',
        email: await fakeEmail(),
        password: 'fake1234hash',
        roleId: roleIdMap.admin,
        genderId: genderIdMap.na
      }
    ];

    const adminValues = admins
      .map(
        (admin) =>
          `('${admin.firstname}', '${admin.lastname}', '${admin.email}', '${admin.password}', ${admin.roleId}, ${admin.genderId})`
      )
      .join(', ');

    await queryRunner.manager.query(`
      INSERT INTO "user"
      (firstname, lastname, email, password, "roleId", "genderId")
      VALUES ${adminValues}
    `);

    // SECRETARIES
    const secretaries = [
      {
        firstname: 'Samuel',
        lastname: 'Secretary',
        email: await fakeEmail(),
        password: 'fake1234hash',
        roleId: roleIdMap.secretary,
        genderId: genderIdMap.na,
        departmentId: Math.floor(Math.random() * departments.length) + 1
      },
      {
        firstname: 'Sally',
        lastname: 'Secretary',
        email: await fakeEmail(),
        password: 'fake1234hash',
        roleId: roleIdMap.secretary,
        genderId: genderIdMap.na,
        departmentId: Math.floor(Math.random() * departments.length) + 1
      }
    ];

    const secretaryValues = secretaries
      .map(
        (secretary) =>
          `('${secretary.firstname}', '${secretary.lastname}', '${secretary.email}', '${secretary.password}', ${secretary.roleId}, ${secretary.genderId}, ${secretary.departmentId})`
      )
      .join(', ');

    const secretaryResult = await queryRunner.manager.query(`
      INSERT INTO "user"
      (firstname, lastname, email, password, "roleId", "genderId", "departmentId")
      VALUES ${secretaryValues}
      RETURNING id
    `);

    const secretaryIds = secretaryResult.map((item: { id: number }) => item.id);

    // 3. WORKING HOURS
    type WorkdayHours = {
      doctorId: number;
      weekday: number;
      startTime: string;
      endTime: string;
    };

    function generateWorkingHours(doctorIds: number[]): WorkdayHours[] {
      const workdays = [0, 1, 2, 3, 4, 5, 6];
      const daysWorked = 5;
      const possibleShifts = [
        ['06:00', '14:00'],
        ['08:00', '16:00'],
        ['10:00', '18:00'],
        ['12:00', '20:00']
      ];
      const workingHours: WorkdayHours[] = [];
      doctorIds.forEach((doctorId) => {
        const startDay = Math.floor(
          Math.random() * (workdays.length - daysWorked)
        );
        const [startTime, endTime] =
          possibleShifts[Math.floor(Math.random() * possibleShifts.length)];
        for (let i = startDay; i < startDay + daysWorked; i++) {
          const weekday = i;
          workingHours.push({ doctorId, weekday, startTime, endTime });
        }
      });
      return workingHours;
    }

    const workingHours = generateWorkingHours(doctorIds);

    const workingHoursValues = workingHours
      .map(
        (workingHour) =>
          `(${workingHour.doctorId}, ${workingHour.weekday}, '${workingHour.startTime}', '${workingHour.endTime}')`
      )
      .join(', ');

    await queryRunner.manager.query(`
        INSERT INTO "working_hours"
        ("doctorId", "weekday", "startTime", "endTime")
        VALUES ${workingHoursValues}
        `);

    // 4. PATIENTS
    function generateFakeSSN(): string {
      const ssn = Math.floor(Math.random() * 1000000000000000).toString();
      return ssn;
    }

    const patients = [
      {
        firstname: 'Pedro',
        lastname: 'Patient',
        email: await fakeEmail(),
        ssn: generateFakeSSN(),
        town: 'Townsville',
        postcode: '12345',
        dateOfBirth: '1990-04-21',
        genderId: genderIdMap.male
      },
      {
        firstname: 'Penelope',
        lastname: 'Patient',
        email: await fakeEmail(),
        ssn: generateFakeSSN(),
        town: 'Townsville',
        postcode: '12345',
        dateOfBirth: '1980-10-17',
        genderId: genderIdMap.female
      },
      {
        firstname: 'Pantagruel',
        lastname: 'Patient',
        email: await fakeEmail(),
        ssn: generateFakeSSN(),
        town: 'Townsville',
        postcode: '12345',
        dateOfBirth: '1970-01-05',
        genderId: genderIdMap.male
      },
      {
        firstname: 'Persephone',
        lastname: 'Patient',
        email: await fakeEmail(),
        ssn: generateFakeSSN(),
        town: 'Townsville',
        postcode: '12345',
        dateOfBirth: '2000-09-30',
        genderId: genderIdMap.female
      }
    ];

    const patientValues = patients
      .map(
        (patient) =>
          `('${patient.firstname}', '${patient.lastname}', '${patient.email}', '${patient.ssn}', '${patient.town}', '${patient.postcode}', '${patient.dateOfBirth}', ${patient.genderId})`
      )
      .join(', ');

    const patientResult = await queryRunner.manager.query(`
      INSERT INTO "patient"
      (firstname, lastname, email, ssn, town, postcode
      , "dateOfBirth", "genderId")
      VALUES ${patientValues}
      RETURNING id
    `);

    const patientIds = patientResult.map((item: { id: number }) => item.id);

    // 5. CONSULTATIONS
    type Consultation = {
      description: string;
      consultationDate: string;
      startTime: string;
      durationMinutes: number;
      subjectId: number;
      doctorId: number;
      authorId: number;
      patientId: number;
    };

    // IMPORTANT NOTE - these start times are currently hardcoded to work with 4 fake patients and to fit within possible fake doctor working times on a single day. This is to avoid having to do lengthy checks of consistency that randomly generated consultations don't happen at the same time with the same doctor.
    const consultationStartTimes = ['12:00', '12:30', '13:00', '13:30'];

    const consultations: Consultation[] = patientIds.map(
      (patientId: number, index: number): Consultation => {
        const doctorId =
          doctorIds[Math.floor(Math.random() * doctorIds.length)];
        const authorId =
          secretaryIds[Math.floor(Math.random() * secretaryIds.length)];
        const subjectId =
          Math.floor(Math.random() * consultationSubjects.length) + 1;
        const description = 'This is a fake consultation description';
        const consultationDate = '2024-12-21';
        const startTime = consultationStartTimes[index];
        const durationMinutes = 30;
        return {
          description,
          consultationDate,
          startTime,
          durationMinutes,
          subjectId,
          doctorId,
          authorId,
          patientId
        };
      }
    );

    const consultationValues = consultations
      .map(
        (consultation) =>
          `('${consultation.description}', '${consultation.consultationDate}', '${consultation.startTime}', ${consultation.durationMinutes}, ${consultation.subjectId}, ${consultation.doctorId}, ${consultation.authorId}, ${consultation.patientId})`
      )
      .join(', ');

    const consultationResult = await queryRunner.manager.query(`
      INSERT INTO "consultation"
      ("description", "consultationDate", "startTime", "durationMinutes", "subjectId", "doctorId", "authorId", "patientId")
      VALUES ${consultationValues}
      RETURNING id
    `);

    const consultationIds = consultationResult.map(
      (item: { id: number }) => item.id
    );

    console.info(consultationIds);

    // COMMIT TRANSACTION
    await queryRunner.commitTransaction();
  } catch (error) {
    console.error('Seed error: ', error);
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
  }
})();
