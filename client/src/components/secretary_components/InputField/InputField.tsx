import { InputFieldProps } from '../../AdminPopup/AdminPopup.types';

export default function InputField({
  className,
  name,
  label,
  placeholder,
  value,
  onChange,
  disabled,
  type = 'text'
}: InputFieldProps) {
  return (
    <label className={`form-control ${className || 'w-full'}`}>
      <div className="label">
        <span className="label-text text-primary">{label}</span>
      </div>
      <input
        className="input input-bordered w-full border-primary"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        type={type}
      />
    </label>
  );
}
