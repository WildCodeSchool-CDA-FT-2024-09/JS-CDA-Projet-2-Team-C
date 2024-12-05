const roleMap = {
  agent: 'Agent',
  secretary: 'Secrétaire',
  doctor: 'Médecin',
  admin: 'Admin'
};

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
