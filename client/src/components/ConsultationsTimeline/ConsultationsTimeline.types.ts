import { DossierQuery } from '../../generated/graphql-types';

export interface ConsultationsTimelineProps {
  consultations: DossierQuery['dossier'];
}
