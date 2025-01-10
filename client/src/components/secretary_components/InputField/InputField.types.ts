import { ChangeEvent } from 'react';

export default interface InputFieldProps {
  className?: string;
  name: string;
  label: string;
  placeholder?: string;
  value: string | undefined;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  type?: string;
}
