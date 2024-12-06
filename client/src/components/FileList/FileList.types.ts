// import { Attachment } from '../../generated/graphql-types';

// export interface FileListProps {
//   files: Array<Attachment>;
//   consultationId: number;
// }

import { DossierQuery } from '../../generated/graphql-types';

export interface FileListProps {
  files: DossierQuery['dossier'][number]['attachments'];
  consultationId: number;
}
