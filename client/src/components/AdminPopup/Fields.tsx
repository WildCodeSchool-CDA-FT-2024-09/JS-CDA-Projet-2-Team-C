export const InputField = ({
  name,
  label,
  placeholder,
  value,
  onChange,
  disabled,
  type = 'text'
}) => (
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

export const SelectField = ({
  name,
  label,
  options,
  value,
  onChange,
  disabled
}) => (
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
