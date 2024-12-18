import { SelectFieldProps } from './SelectField.types';

export default function SelectField({
  name,
  label,
  options,
  value,
  onChange,
  disabled
}: SelectFieldProps) {
  return (
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text text-primary">{label}</span>
      </div>
      <select
        className="select select-bordered w-full max-w-xs border-primary"
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        <option value="" disabled>
          {label}
        </option>
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </label>
  );
}
