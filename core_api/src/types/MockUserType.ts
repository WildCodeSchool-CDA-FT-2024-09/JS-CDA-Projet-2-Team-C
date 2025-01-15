import { RoleCode } from '../modules/entities.index';

export type MockUser = {
  id: string;
  role: {
    code: RoleCode | null;
  };
};
