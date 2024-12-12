import { roleMap } from '../UserList/roleMap';

export default function OptionSelect() {
  return (
    <>
      {Object.entries(roleMap).map(([key, value]) => (
        <option key={key} value={key.toLowerCase()}>
          Role : {value}
        </option>
      ))}
    </>
  );
}
