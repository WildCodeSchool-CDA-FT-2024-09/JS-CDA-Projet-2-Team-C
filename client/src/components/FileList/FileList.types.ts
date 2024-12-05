import { Attachment } from '../../generated/graphql-types';

export interface FileListProps {
  files: Array<Attachment>;
  consultationId: number;
}
