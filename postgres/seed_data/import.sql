CREATE TABLE raw_data (
  consultation_description TEXT,
  consultation_motif TEXT,
  attachment_file_1 TEXT,
  attachment_description_1 TEXT,
  consultation_date DATE,
  consultation_duration INT,
  consultation_start_time TIME,
  fullname_medecin TEXT,
  prenom_medecin TEXT,
  nom_medecin TEXT,
  email_medecin TEXT,
  genre_medecin TEXT,
  service_medecin TEXT,
  workdays_medecin TEXT,
  heure_debut_medecin TIME,
  heure_fin_medecin TIME,
  fullname_patient TEXT,
  prenom_patient TEXT,
  nom_patient TEXT,
  sex_patient TEXT,
  ssn_patient TEXT,
  email_patient TEXT,
  attachment_file_2 TEXT,
  attachment_description_2 TEXT,
  date_naissance_patient DATE,
  code_postal_patient TEXT,
  ville_patient TEXT,
  id_user INT,
  id_patient INT,
  id_consultation INT,
  id_attach_1 INT,
  id_attach_2 INT
);


COPY raw_data
FROM
'/docker-entrypoint-initdb.d/med_data_v3.csv' 
WITH (FORMAT csv, HEADER);
