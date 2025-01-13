import { PageNames } from './Layout.types';

export const pageNames: PageNames = {
  '/': 'Login',
  '/planning': 'Planning',
  '/consultation': 'Consultation',
  '/dossiers': 'Dossiers',
  '/dossier:id': 'Dossier patient',
  '/planning/patient/:patientId/dossier': 'Dossier patient',
  '/patient/:patientId/dossier': 'Dossier patient',
  '/admin': 'Administrateur',
  '/consultations': 'Liste consultations',
  '/rechercher': 'Recherche rapide',
  'patient/1/dossier': 'Dossier patient'
};
