import { Department } from '../../generated/graphql-types';

export type PartialDepartment = Pick<Department, 'id' | 'label'>;

export interface DepartmentsListProps {
  departments: PartialDepartment[];
}
