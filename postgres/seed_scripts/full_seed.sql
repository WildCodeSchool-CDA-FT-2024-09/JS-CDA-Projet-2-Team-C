BEGIN;

TRUNCATE consultation_subject,
role,
gender,
department,
working_hours,
attachment,
consultation,
patient,
"user" restart identity CASCADE;

-- Seed roles
INSERT INTO
  "role" (code, label)
VALUES
  ('admin', 'administrateur'),
  ('doctor', 'docteur'),
  ('agent', 'agent'),
  ('secretary', 'secrétaire');

-- Seed genders
INSERT INTO
  "gender" (label)
VALUES
  ('Male'),
  ('Female'),
  ('NA');

-- Seed departments
INSERT INTO
  department (label)
SELECT
  DISTINCT service_medecin
FROM
  raw_data rd;

-- Seed consultation subjects
INSERT INTO
  consultation_subject (label)
SELECT
  DISTINCT consultation_motif
FROM
  raw_data rd;

-- Seed users 1 - Doctors
-- 1) Match and insert doctors, return their IDs + emails
WITH new_doctors AS (
  INSERT INTO
    "user" (
      firstname,
      lastname,
      email,
      "roleId",
      "departmentId",
      "genderId",
      PASSWORD
    )
  SELECT
    DISTINCT prenom_medecin,
    nom_medecin,
    email_medecin,
    (
      SELECT
        id
      FROM
        role
      WHERE
        role.code = 'doctor'
    ) AS roleId,
    (
      SELECT
        id
      FROM
        department
      WHERE
        department.label = raw.service_medecin
    ) AS departmentId,
    (
      SELECT
        id
      FROM
        gender
      WHERE
        gender.label = CASE
          WHEN raw.genre_medecin = 'Homme' THEN 'Male'
          ELSE 'Female'
        END
    ) AS genderId,
    '$argon2id$v=19$m=65536,t=3,p=4$HiwWuHvgEopNOIIEA3UIRw$BhD+ZPAnOnJ64tXcYNIv1NwjzDpk+kewifoW9FUO5Sk'
  FROM
    raw_data raw returning id,
    email
) -- 2) Update raw_data with the new user (doctor) IDs
UPDATE
  raw_data r
SET
  id_doctor = nd.id
FROM
  new_doctors nd
WHERE
  nd.email = r.email_medecin;

-- Seed users 2 - fake Doctor, Agent, Secretary, Admin
INSERT INTO
  "user" (
    firstname,
    lastname,
    email,
    "roleId",
    "departmentId",
    "genderId",
    PASSWORD
  )
VALUES
  (
    'Cyril',
    'Convergence',
    'fakedoctor@fake.com',
    (
      SELECT
        id
      FROM
        role
      WHERE
        role.code = 'doctor'
    ),
    1,
    (
      SELECT
        id
      FROM
        gender
      WHERE
        gender.label = 'Male'
    ),
    '$argon2id$v=19$m=65536,t=3,p=4$HiwWuHvgEopNOIIEA3UIRw$BhD+ZPAnOnJ64tXcYNIv1NwjzDpk+kewifoW9FUO5Sk'
  ),
  (
    'Alice',
    'Admin',
    'fakeadmin@fake.com',
    (
      SELECT
        id
      FROM
        role
      WHERE
        role.code = 'admin'
    ),
    NULL,
    (
      SELECT
        id
      FROM
        gender
      WHERE
        gender.label = 'Female'
    ),
    '$argon2id$v=19$m=65536,t=3,p=4$HiwWuHvgEopNOIIEA3UIRw$BhD+ZPAnOnJ64tXcYNIv1NwjzDpk+kewifoW9FUO5Sk'
  ),
  (
    'Anna',
    'Agent',
    'fakeagent@fake.com',
    (
      SELECT
        id
      FROM
        role
      WHERE
        role.code = 'agent'
    ),
    NULL,
    (
      SELECT
        id
      FROM
        gender
      WHERE
        gender.label = 'Female'
    ),
    '$argon2id$v=19$m=65536,t=3,p=4$HiwWuHvgEopNOIIEA3UIRw$BhD+ZPAnOnJ64tXcYNIv1NwjzDpk+kewifoW9FUO5Sk'
  ),
  (
    'Samuel',
    'Secretary',
    'fakesecretary@fake.com',
    (
      SELECT
        id
      FROM
        role
      WHERE
        role.code = 'secretary'
    ),
    NULL,
    (
      SELECT
        id
      FROM
        gender
      WHERE
        gender.label = 'Male'
    ),
    '$argon2id$v=19$m=65536,t=3,p=4$HiwWuHvgEopNOIIEA3UIRw$BhD+ZPAnOnJ64tXcYNIv1NwjzDpk+kewifoW9FUO5Sk'
  );

INSERT INTO
  "working_hours" ("doctorId", "weekday", "startTime", "endTime")
SELECT
  sub.id_doctor :: uuid,
  CASE
    LOWER(TRIM(day_txt))
    WHEN 'dimanche' THEN 0
    WHEN 'lundi' THEN 1
    WHEN 'mardi' THEN 2
    WHEN 'mercredi' THEN 3
    WHEN 'jeudi' THEN 4
    WHEN 'vendredi' THEN 5
    WHEN 'samedi' THEN 6
  END AS weekday,
  sub.heure_debut_medecin AS startTime,
  sub.heure_fin_medecin AS endTime
FROM
  (
    -- Subquery: distinct rows (so each doctor is only taken once)
    SELECT
      DISTINCT id_doctor,
      workdays_medecin,
      heure_debut_medecin,
      heure_fin_medecin
    FROM
      raw_data
    WHERE
      id_doctor IS NOT NULL
      AND workdays_medecin IS NOT NULL
      AND workdays_medecin <> ''
  ) AS sub -- Split comma-separated day strings
  -- JOIN LATERAL return one row per item for the set defined on the right side of the join
  -- The comma separated string is split via an array to return multiple weekdays
  -- So for each distinct doctor row on the left, we get as many weekdays as existed in the string
  -- We join on true because we want to include all of these
  -- We call this day_txt for use in the previously defined case - when mapping to day numbers
  JOIN LATERAL unnest(string_to_array(sub.workdays_medecin, ',')) day_txt ON TRUE;

-- Seed Patients
-- 1) Insert into patients, returning (id, email)
WITH new_patients AS (
  INSERT INTO
    "patient" (
      firstname,
      lastname,
      email,
      ssn,
      town,
      postcode,
      "dateOfBirth",
      "genderId"
    )
  SELECT
    DISTINCT raw.prenom_patient,
    raw.nom_patient,
    raw.email_patient,
    raw.ssn_patient,
    raw.ville_patient,
    raw.code_postal_patient,
    raw.date_naissance_patient,
    (
      SELECT
        id
      FROM
        gender
      WHERE
        label = CASE
          WHEN raw.sex_patient = 'M' THEN 'Male'
          ELSE 'Female'
        END
    )
  FROM
    raw_data raw
  WHERE
    raw.email_patient IS NOT NULL RETURNING id,
    email
) -- 2) Update raw_data with the new patient IDs
UPDATE
  raw_data r
SET
  id_patient = np.id
FROM
  new_patients np
WHERE
  np.email = r.email_patient;

-- Seed Consultations
-- 1) Insert new consultations from raw_data
WITH new_consultations AS (
  INSERT INTO
    "consultation" (
      "description",
      "consultationDate",
      "startTime",
      "durationMinutes",
      "doctorId",
      "patientId",
      "authorId",
      "subjectId"
    )
  SELECT
    DISTINCT raw.consultation_description,
    CASE
      WHEN raw.consultation_date = '2024-02-29' THEN '2025-02-28' :: date
      ELSE make_date(
        2025,
        EXTRACT(
          MONTH
          FROM
            raw.consultation_date
        ) :: int,
        EXTRACT(
          DAY
          FROM
            raw.consultation_date
        ) :: int
      )
    END AS consultationDate,
    raw.consultation_start_time,
    raw.consultation_duration,
    raw.id_doctor,
    raw.id_patient,
    (
      SELECT
        u.id
      FROM
        "user" u
        JOIN role r ON r.id = u."roleId"
      WHERE
        r.code = 'secretary'
      ORDER BY
        u.id
      LIMIT
        1
    ) AS authorId,
    (
      SELECT
        id
      FROM
        consultation_subject
      WHERE
        label = raw.consultation_motif
    )
  FROM
    raw_data raw
  WHERE
    raw.id_doctor IS NOT NULL
    AND raw.id_patient IS NOT NULL
    AND raw.consultation_description IS NOT NULL RETURNING id,
    description,
    "consultationDate",
    "startTime",
    "durationMinutes",
    "doctorId",
    "patientId"
) -- 2) Update raw_data so it knows about the new consultation IDs
UPDATE
  raw_data r
SET
  id_consultation = nc.id
FROM
  new_consultations nc
WHERE
  r.consultation_description = nc.description
  AND CASE
    WHEN r.consultation_date = '2024-02-29' THEN '2025-02-28' :: date
    ELSE make_date(
      2025,
      EXTRACT(
        MONTH
        FROM
          r.consultation_date
      ) :: int,
      EXTRACT(
        DAY
        FROM
          r.consultation_date
      ) :: int
    )
  END = nc."consultationDate"
  AND r.consultation_start_time = nc."startTime"
  AND r.consultation_duration = nc."durationMinutes"
  AND r.id_doctor = nc."doctorId"
  AND r.id_patient = nc."patientId";

-- Seed Attachments
INSERT INTO
  "attachment" (
    "consultationId",
    "authorId",
    "fileDisplayName",
    "note",
    "filePath"
  )
SELECT
  r.id_consultation,
  (
    SELECT
      u.id
    FROM
      "user" u
      JOIN role rr ON rr.id = u."roleId"
    WHERE
      rr.code = 'secretary'
    ORDER BY
      u.id
    LIMIT
      1
  ) AS authorId,
  x.file AS fileDisplayName,
  x.note AS note,
  '/upload/attachments/' || x.file AS filePath
FROM
  raw_data r
  JOIN LATERAL (
    VALUES
      (r.attachment_file_1, r.attachment_description_1),
      (r.attachment_file_2, r.attachment_description_2)
  ) AS x(FILE, note) ON TRUE
WHERE
  x.file IS NOT NULL
  AND x.file <> ''
  AND r.id_consultation IS NOT NULL;

COMMIT;