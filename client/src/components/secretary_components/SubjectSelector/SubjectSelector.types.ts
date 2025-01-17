import { ChangeEventHandler } from 'react';

export interface SubjectSelectorProps {
  details: Record<string, string> | null;
  handleSubjectSelected: ChangeEventHandler<HTMLSelectElement>;
  handleDescriptionChange: ChangeEventHandler<HTMLInputElement>;
}
