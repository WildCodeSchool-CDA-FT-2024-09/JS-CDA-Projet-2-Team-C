export type PageLayoutProps = {
  children: React.ReactNode;
  page: PageRoutes;
};

type KnownRoutes =
  | '/'
  | '/planning'
  | '/consultation'
  | '/dossiers'
  | '/dossier:id'
  | '/patient/:patientId/dossier'
  | '/admin'
  | '/consultations';

type PageRoutes = KnownRoutes | string;

export type PageNames = {
  [key in PageRoutes]: string;
};
