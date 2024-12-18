export interface SelectFieldProps {
  name: string;
  label: string;
  options: { value: number; label: string }[];
  value: number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
}
