import { DossierQuery } from '../../generated/graphql-types';

export interface ConsultationsTimelineEventProps {
  consultation: DossierQuery['dossier'][number];
  isFirst?: boolean;
  isLast?: boolean;
}
