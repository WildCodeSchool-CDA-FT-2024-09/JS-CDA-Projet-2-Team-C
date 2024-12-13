import { InputFieldProps } from './AdminPopup.types';

const InputField = ({
  name,
  label,
  placeholder,
  value,
  onChange,
  disabled,
  type = 'text'
}: InputFieldProps) => (
  <label className="form-control w-full max-w-xs">
    <div className="label">
      <span className="label-text text-primary">{label}</span>
    </div>
    <input
      className="input input-bordered w-full max-w-xs border-primary"
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      type={type}
    />
  </label>
);

export default InputField;
