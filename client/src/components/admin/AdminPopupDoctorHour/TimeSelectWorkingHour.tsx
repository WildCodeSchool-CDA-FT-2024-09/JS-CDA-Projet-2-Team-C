export default function TimeSelect({
  value,
  onChange,
  options,
  label
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  label: string;
}) {
  return (
    <select
      className="select select-bordered max-w-xs"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
    >
      <option disabled value="">
        {label}
      </option>
      {options.map((time) => (
        <option key={time} value={time}>
          {time}
        </option>
      ))}
    </select>
  );
}
