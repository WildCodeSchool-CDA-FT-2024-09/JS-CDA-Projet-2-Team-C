import { PropsWithChildren } from 'react';

export type PageLayoutProps = PropsWithChildren<{
  page: PageRoutes;
}>;

type KnownRoutes =
  | '/'
  | '/planning'
  | '/consultation'
  | '/dossiers'
  | '/dossier:id'
  | '/patient/:patientId/dossier'
  | '/admin'
  | '/consultations';

export type PageRoutes = KnownRoutes | string;

export type PageNames = {
  [key in PageRoutes]: string;
};
