// Interface originale de Role
export default interface Role {
  id: number;
  label: string;
  code: string;
}

export interface TranslatedRole extends Role {
  labelFr: string;
}
