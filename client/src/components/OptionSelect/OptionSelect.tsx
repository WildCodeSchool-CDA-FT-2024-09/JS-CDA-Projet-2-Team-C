import roleMap from '../UserList/roleMap';

export default function OptionSelect() {
  return (
    <>
      {Object.entries(roleMap).map(([key, value]) => (
        <option key={key} value={key}>
          Role : {value}
        </option>
      ))}
    </>
  );
}
