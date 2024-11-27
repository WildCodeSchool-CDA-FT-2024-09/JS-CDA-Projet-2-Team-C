CREATE TABLE csv_import (
  rdv_description TEXT,
  rdv_subject TEXT,
  attachment_1 TEXT,
  attachment_1_info TEXT,
  rdv_date DATE,
  rdv_duration INT,
  rdv_start TIME,
  dr_name TEXT,
  dr_gender TEXT,
  dr_service TEXT,
  dr_workdays TEXT,
  dr_start_time TIME,
  dr_end_time TIME,
  patient_name TEXT,
  patient_gender TEXT,
  attachment_2 TEXT,
  attachment_2_info TEXT,
  patient_dob DATE,
  patient_town TEXT,
  patient_lastname TEXT,
  patient_firstname TEXT
);

COPY csv_import
FROM
'/docker-entrypoint-initdb.d/med_raw_import.csv' 
WITH (FORMAT csv);
